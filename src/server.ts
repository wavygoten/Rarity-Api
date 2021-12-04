import express from "express";
import { Routes } from "./routes/routes";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import config from "../config.json";
class Server {
	private app: express.Application;
	private port: number;
	private router: Routes;
	constructor() {
		this.app = express();
		this.port = config.PORT;
		this.router = new Routes();
		this.configuration();
		this.routes();
	}

	/**
	 * Express Server Configuration
	 */
	public configuration() {
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		this.app.use(helmet());
		this.app.use(cors());
	}

	/**
	 * Express Router Configuration
	 */
	public routes() {
		this.app.get("/api/:contractaddress", this.router.index);
		this.app.post("/api/contractaddress", this.router.scrape);
		this.app.get("/deleteTable", this.router.deleteTable);
		this.app.get("/createTable", this.router.createTable);
		this.app.get("/deleteData", this.router.deleteData);
		this.app.get("/createDB", this.router.createDB);
		this.app.get("/deleteDB", this.router.deleteDB);
	}

	/**
	 * Start Express Server
	 */
	public start() {
		this.app.listen(this.port, () => {
			console.info("Server is listening on", this.port);
		});
	}
}

const server = new Server();
server.start();
