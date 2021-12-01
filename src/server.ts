require("dotenv").config();
import express from "express";
import { Routes } from "./routes/routes";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
class Server {
	private app: express.Application;
	private port: number;
	private router: Routes;
	constructor() {
		this.app = express();
		this.port = 9785;
		this.configuration();
		this.router = new Routes();
		this.routes();
	}

	public configuration() {
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		this.app.use(helmet());
		this.app.use(cors());
	}

	public routes() {
		this.app.use(this.router.index);
	}

	public start() {
		this.app.listen(this.port, () => {
			console.info("Server is listening on ", this.port);
		});
	}
}

const server = new Server();
server.start();
