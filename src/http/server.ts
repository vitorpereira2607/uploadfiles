import fastify from "fastify";
import { uploadsRoutes } from "../routes/uploads";
import cors from "@fastify/cors";

const app = fastify({
  logger: true,
});

app.register(cors, {
    origin: '*',  
    methods: ['GET', 'PUT', 'POST', 'DELETE'],  
    allowedHeaders: '*'
});

app.register(uploadsRoutes);

app.listen({ port: 3333, host: "0.0.0.0" }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server running: http://localhost:3333`);
  });
