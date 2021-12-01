"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 9785;
        this.configuration();
        this.router = new routes_1.Routes();
        this.routes();
    }
    configuration() { }
    routes() {
        this.app.use(this.router.index);
    }
    start() {
        this.app.listen(this.port, () => {
            console.info("Server is listening on ", this.port);
        });
    }
}
const server = new Server();
server.start();
