import { Server, SubServer } from "./servers";

const server = new Server();
const subServer = new SubServer();

server.start();
subServer.start();
