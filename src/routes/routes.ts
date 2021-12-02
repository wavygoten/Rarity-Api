import { Router, Response, Request } from "express";
import { DB } from "../db/db";
export class Routes {
	public router: Router;
	public db: DB;
	constructor() {
		this.router = Router();
		this.db = new DB();
	}

	public index = async (req: Request, res: Response) => {
		// await this.db.insert("test", [
		// 	{
		// 		test: "test",
		// 	},
		// ]);
		res.send({ success: true });
	};

	public deleteTable = async (req: Request, res: Response) => {
		// await this.db.deleteTable();
		res.send({ success: true });
	};

	public createTable = async (req: Request, res: Response) => {
		// await this.db.createTable();
		res.send({ success: true });
	};

	public createDB = async (req: Request, res: Response) => {
		// await this.db.createDB();
		res.send({ success: true });
	};

	public deleteDB = async (req: Request, res: Response) => {
		// await this.db.deleteDB();
		res.send({ success: true });
	};

	public deleteData = async (req: Request, res: Response) => {
		// await this.db.deleteData();
		res.send({ success: true });
	};
}
