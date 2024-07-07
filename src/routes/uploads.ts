import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "crypto";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "../../prisma/index";
import { env } from "../env";
import { r2 } from "../lib/couldflare";
import { uploadBodySchema, getFileParamsSchema } from "../schemas";

export async function uploadsRoutes(app: FastifyInstance) {
  app.post("/uploads", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name, contentType } = uploadBodySchema.parse(request.body);

      const fileKey = randomUUID().concat("-").concat(name);

      const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: env.ClOUDFLARE_BUCKET_NAME,
          Key: fileKey,
          ContentType: contentType,
        }),
        { expiresIn: 600 }
      );

      const file = await prisma.file.create({
        data: {
          name,
          contentType,
          key: fileKey,
        },
      });

      return { file: file.id, signedUrl };
    } catch (error) {
      console.error(`Error uploading file: ${(error as Error).message}`);
      reply.code(500).send({ error: "File upload failed" });
    }
  });

  app.get("/uploads/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = getFileParamsSchema.parse(request.params);

      const file = await prisma.file.findUniqueOrThrow({
        where: {
          id,
        },
      });

      const signedUrl = await getSignedUrl(
        r2,
        new GetObjectCommand({
          Bucket: env.ClOUDFLARE_BUCKET_NAME,
          Key: file.key,
        }),
        { expiresIn: 600 }
      );

      return { signedUrl };
    } catch (error) {
      console.error(`Error retrieving file: ${(error as Error).message}`);
      reply.code(404).send({ error: "File not found" });
    }
  });
}
