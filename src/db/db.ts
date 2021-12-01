import { Pool } from "pg";
class DB {
	public pool = new Pool();
	constructor() {
		// move to env
		this.pool = new Pool({
			connectionString: `//admin:secretss@localhost:5432/test`,
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
