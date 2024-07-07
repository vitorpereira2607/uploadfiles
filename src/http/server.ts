import fastify from "fastify";
import { uploadsRoutes } from "../routes/uploads";

const app = fastify();

app.register(uploadsRoutes);

app.listen({ port: 3333, host: "0.0.0.0" }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server running: http://localhost:3333`);
  });
