import { Pool } from "pg";
import config from "../../config.json";
export class DB {
	public pool: Pool;
	constructor() {
		this.pool = new Pool({
			connectionString: config.PG,
		});
	}

	/**
	 * Creates a new database called rarities.
	 */
	async createDB() {
		await this.pool.query(`CREATE DATABASE rarities;`).catch((err: any) => {
			console.error(err);
		});
	}
	/**
	 * Deletes a new database called rarities.
	 */
	async deleteDB() {
		// remove this once done testing.
		await this.pool
			.query(`DROP DATABASE IF EXISTS rarities;`)
			.catch((err: any) => {
				console.error(err);
			});
	}
	/**
	 * Creates a new table called contracts.
	 */
	async createTable() {
		await this.pool
			.query(
				`CREATE TABLE IF NOT EXISTS contracts (id SERIAL PRIMARY KEY, contract TEXT, data jsonb);`
			)
			.catch((err) => {
				console.error(err);
			});
	}
	/**
	 * Insert contract and data into contracts table.
	 */
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
	/**
	 * Delete all data within contracts table.
	 */
	async deleteData() {
		await this.pool.query(`DELETE FROM contracts`).catch((err) => {
			console.error(err);
		});
	}

	/**
	 * Deletes a new table called contracts.
	 */
	async deleteTable() {
		await this.pool.query(`DROP TABLE IF EXISTS contracts`).catch((err) => {
			console.error(err);
		});
	}
}
