import express from "express";

// import { isLoggedIn } from "./guard";
import http from "http";
import { Server as SocketIO } from "socket.io";
import { setSocketIO } from "./socketio";
import { logger } from "./logger";

import userRoutes from "./router/userRoutes";
// import { dummyCounter, pageNotFound, requestLogger } from "./middlewares";
import { env } from "./env";
import { UserController } from "./controller/UserController";
import { UserService } from "./service/UserService";
import { knex } from "./db";
import cors from "cors";
// import { isLoggedIn } from "./guard";
// import path from "path";

// import { hashPassword, } from './hash';
import { pageNotFound } from "./middlewares";

// import { hashPassword, } from './hash';

/////////////////////  Set up
export const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

setSocketIO(io);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL!]
}))

app.set("trust proxy", 1);
export const userController = new UserController(new UserService(knex));

// app.use(requestLogger, dummyCounter);
app.use(userRoutes);




// app.use(isLoggedIn, express.static("protected"));

// app.use(express.static("uploads"));
app.use(pageNotFound);

const PORT = env.PORT;

server.listen(PORT, () => {
    logger.info(`Server準備好喇： http://localhost:${PORT}/`);
});
