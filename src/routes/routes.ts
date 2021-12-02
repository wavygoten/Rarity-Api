import { Router, Response, Request } from "express";
import { DB } from "../db/db";
export class Routes {
	public router: Router;
	public db: DB;
	constructor() {
		this.router = Router();
		this.db = new DB();
	}

	/**
	 * Fetch all data from route "/:address"
	 * @return {Response} Response when fetching specific data using url query.
	 */
	public index = async (req: Request, res: Response) => {
		await this.db.insert("test", [
			{
				test: "test",
			},
		]);
		res.send({ success: true });
	};

	/**
	 * Scrape data with post request to address route "/contract"
	 * @return {Response} Response when finished scraping.
	 */
	public deleteTable = async (req: Request, res: Response) => {
		res.send({ success: true });
	};

	public createTable = async (req: Request, res: Response) => {
		res.send({ success: true });
	};

	public createDB = async (req: Request, res: Response) => {
		res.send({ success: true });
	};

	public deleteDB = async (req: Request, res: Response) => {
		res.send({ success: true });
	};

	public deleteData = async (req: Request, res: Response) => {
		res.send({ success: true });
	};
}
