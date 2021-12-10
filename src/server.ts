import express from "express";
import { Routes } from "./routes/routes";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import config from "../config.json";

const rateLimit = require("express-rate-limit");
const createAccountLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 min window
	max: 2, // start blocking after 2 requests
	message: "Too many requests from this IP, please try again after 30 mins",
});
const apiLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 20,
	message: "Too many requests from this IP, please try again after 5 mins",
});

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
		this.app.get("/api/:contractaddress", apiLimiter, this.router.index);
		this.app.post(
			"/api/contractaddress",
			createAccountLimiter,
			this.router.scrape
		);
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
