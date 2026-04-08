import http from "http";
import next from "next";
import { Server } from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    //Create a raw http server that forwards requests to the Next.js handler
    const httpServer = http.createServer((req, res) => {
      handle(req, res);
    });

    //Attach socket.io's Server to the HTTP server
    const io = new Server(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "*",
        methods: ["GET", "POST"],
      },
    });

    //Store the io instance on global so API routes can reach it
    (global as any).io = io;

    //Listen on a port
    httpServer.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error starting Next.js custom server:", err);
    process.exit(1);
  });
