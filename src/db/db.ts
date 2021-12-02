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
        `CREATE TABLE IF NOT EXISTS contracts (id SERIAL PRIMARY KEY, contract TEXT, tokenid TEXT, data jsonb);`
      )
      .catch((err) => {
        console.error(err);
      });
  }
  /**
   * Insert contract, tokenid and data into contracts table.
   */
  async insert(contract: string, token: number, data: any) {
    await this.pool
      .query(
        `INSERT INTO contracts(contract, tokenid, data)
			VALUES ('${contract}', '${token}', '${JSON.stringify(data)}');`
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
