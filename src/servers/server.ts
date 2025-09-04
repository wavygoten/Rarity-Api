import compression from "@polka/compression";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import config from "../../config.json";
import { Routes } from "../routes/routes";
const apiLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 20,
	message: "Too many requests from this IP, please try again after 5 mins",
});

/**
 * ExpressJS Server
 */
export class Server {
	private app: express.Application;
	private port: number;
	private router: Routes;
	constructor() {
		this.app = express();
		this.port = config.PORT || 9887;
		this.router = new Routes();
		this.configuration();
		this.routes();
	}

	/**
	 * Express Server Configuration
	 */
	public configuration() {
		this.app.use(bodyParser.urlencoded({ extended: false, limit: "10kb" }));
		this.app.use(bodyParser.json({ limit: "10kb" }));
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(compression());
		(this.app as any).use(hpp());
	}

	/**
	 * Express Router Configuration
	 */
	public routes() {
		// -------------- MAIN ROUTES ----------------
		this.app.get("/api/:contractaddress", apiLimiter, this.router.index);
		this.app.get("/api/:contractaddress/:tokenid", this.router.queryIndex);
		this.app.get("/api/", apiLimiter, this.router.account);
		// this.app.post(
		// 	"/api/blockchainrescrape",
		// 	apiLimiter,
		// 	this.router.rescrapeBlock
		// );
		// this.app.post("/api/blockchainscrape", apiLimiter, this.router.blockScrape);
		this.app.post("/api/contractaddress", apiLimiter, this.router.scrape);
		// this.app.post("/api/recontractaddress", apiLimiter, this.router.reScrape);
		this.app.post("/api/stats", apiLimiter, this.router.stats);
		// this.app.post("/api/deleteOne", this.router.deleteOne);
		// -------------------------------------------

		// --------------- DB ROUTES -----------------
		// this.app.get("/api/deleteData", this.router.deleteData);
		// this.app.get("/api/deleteTable", this.router.deleteTable);
		// this.app.get("/api/createDB", this.router.createDB);
		// this.app.get("/api/deleteDB", this.router.deleteDB);
		// -------------------------------------------
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
