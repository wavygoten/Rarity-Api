import { Pool } from "pg";
import config from "../../config.json";
export class DB {
	public pool = new Pool();
	constructor() {
		// move to env
		this.pool = new Pool({
			connectionString: config.PG,
		});
	}
	async createDB() {
		// remove this once done testing.
		await this.pool
			.query(`DROP DATABASE IF EXISTS contracts;`)
			.catch((err: any) => {
				console.error(err);
			});

		await this.pool.query(`CREATE DATABASE contracts;`).catch((err: any) => {
			console.error(err);
		});
	}
}
