import { Router, Response, Request } from "express";

export class Routes {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	public index = async (req: Request, res: Response) => {
		res.send("index");
	};

	public routes() {
		this.router.get("/", this.index);
	}
}
