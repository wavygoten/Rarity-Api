import { Pool } from "pg";
import config from "../../config.json";
export class DB {
	public pool: Pool;
	constructor() {
		// move to env
		this.pool = new Pool({
			connectionString: config.PG,
		});
	}
	async createDB() {
		await this.pool.query(`CREATE DATABASE rarities;`).catch((err: any) => {
			console.error(err);
		});
	}

	async deleteDB() {
		// remove this once done testing.
		await this.pool
			.query(`DROP DATABASE IF EXISTS rarities;`)
			.catch((err: any) => {
				console.error(err);
			});
	}
	async createTable() {
		await this.pool
			.query(
				`CREATE TABLE IF NOT EXISTS contracts (id SERIAL PRIMARY KEY, contract TEXT, data jsonb);`
			)
			.catch((err) => {
				console.error(err);
			});
	}

	async insert(contract: string, data: any) {
		await this.pool
			.query(
				`INSERT INTO contracts(contract, data)
			VALUES ('${contract}', '${JSON.stringify(data)}');`
			)
			.catch((err) => {
				console.error(err);
			});
	}

	async deleteData() {
		await this.pool.query(`DELETE FROM contracts`).catch((err) => {
			console.error(err);
		});
	}
	async deleteTable() {
		await this.pool.query(`DROP TABLE IF EXISTS contracts`).catch((err) => {
			console.error(err);
		});
	}
}
