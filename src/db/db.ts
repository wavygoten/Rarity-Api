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
	 * Send a custom PostgreSQL query to fetch a specific request.
	 */
	async customQuery(query: string) {
		await this.pool.query(query).catch((err: any) => {
			console.error(err);
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
	 * Insert contract, tokenid and data into contracts table.
	 */
	async insert(contract: string, data: any) {
		await this.pool
			.query(
				`INSERT INTO contracts(contract, data)
			VALUES ($1, $2);`,
				[contract, JSON.stringify(data)]
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

	async findOne(column: any, value: any) {
		let data: any;
		switch (column) {
			case "id":
				await this.pool
					.query(`SELECT * FROM contracts WHERE id=${value}`)
					.then((res) => {
						if (!res.rows[0]) {
							data = { success: false };
						} else {
							data = res.rows[0];
						}
					})
					.catch((err) => {
						console.error(err);
					});
				break;
			case "contract":
				await this.pool
					.query(`SELECT * FROM contracts WHERE contract='${value}'`)
					.then((res) => {
						if (!res.rows[0]) {
							data = { success: false };
						} else {
							data = res.rows[0];
						}
					})
					.catch((err) => {
						console.error(err);
					});
				break;
			default:
				break;
		}
		return data;
	}
}
