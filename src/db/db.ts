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
  async createTable(tableName: string) {
    await this.pool
      .query(
        `CREATE TABLE IF NOT EXISTS ${tableName} (id SERIAL PRIMARY KEY, contract TEXT, data jsonb);`
      )
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Insert contract, tokenid and data into contracts table.
   */
  async insert(tableName: string, contract: string, data: any) {
    await this.pool
      .query(
        `INSERT INTO ${tableName}(contract, data)
			VALUES ($1, $2);`,
        [contract, JSON.stringify(data)]
      )
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Insert contract into list of contracts table.
   */
  async expiryDelete(tableName: string) {
    await this.pool
      .query(
        `delete from ${tableName}
		where the_timestamp < now() - interval '7 days';`
      )
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Delete all data within table.
   */
  async deleteData(tableName: string) {
    await this.pool.query(`DELETE FROM ${tableName}`).catch((err) => {
      console.error(err);
    });
  }

  /**
   * Delete specific data within specific table.
   */
  async deleteSpecificData(tableName: string, contractAddress: any) {
    await this.pool
      .query(
        `DELETE FROM ${tableName} WHERE contract ILIKE '${contractAddress}'`
      )
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Deletes a new table called contracts.
   */
  async deleteTable(tableName: string) {
    await this.pool.query(`DROP TABLE IF EXISTS ${tableName};`).catch((err) => {
      console.error(err);
    });
  }

  /**
   * Finds a contract based on its value, NOT case-sensitive
   * @return {Promise} Data found in PostgreSQL
   */
  async findOne(tableName: string, column: any, value: any) {
    let data: any;
    switch (column) {
      case "id":
        await this.pool
          .query(`SELECT * FROM ${tableName} WHERE id=${value}`)
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
          .query(`SELECT * FROM ${tableName} WHERE contract ILIKE '${value}'`)
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
