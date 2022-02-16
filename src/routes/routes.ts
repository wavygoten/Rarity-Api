import { Response, Request } from "express";
import { DB } from "../db/db";
import utils from "../utils/utils";

export class Routes {
  public db: DB;
  constructor() {
    this.db = new DB();
  }

  /**
   * Fetch all data from route "/:address"
   * @return {Response} Response when fetching specific data using url query.
   */
  public index = async (req: Request, res: Response) => {
    if (req.method === "GET") {
      const contractAddress: string = req?.params?.contractaddress;
      const postgresData = await this.db.findOne(
        "contracts",
        "contract",
        `${contractAddress}`
      );
      return res.status(200).json({ success: postgresData });
    } else {
      return res.status(400).json({ success: false });
    }
  };

  /**
   * Fetch user opensea account data.
   * @return {Response} Response when fetched.
   */
  public account = async (req: Request, res: Response) => {
    if (req.method === "GET") {
      const address: any = req?.query?.address;
      const userData = await utils.fetchUserData(address);
      return res.status(200).json({ success: userData });
    } else {
      return res.status(400).json({ success: false });
    }
  };

  /**
   * Scrape data with post request to address route "/contract"
   * @return {Response} Response when finished scraping.
   */
  public scrape = async (req: Request, res: Response) => {
    if (req.method === "POST") {
      const { contractAddress } = req.body;
      const collectionData: any = await utils.fetchContract(contractAddress);
      const slug: string = collectionData?.collection?.slug;
      const collection: any = await utils.fetchCollection(slug);
      const traits: any = collection?.collection?.traits;
      const totalSupply: number = collection?.collection?.stats?.count;
      const traitRarities: any = await utils.checkRarity(traits, totalSupply);
      const assets: any = await utils.fetchMultipleAssets(
        contractAddress,
        totalSupply,
        traitRarities
      );
      if (assets.length > 0) {
        await this.db.insert("contracts", contractAddress, assets);
      } else {
        return res.status(201).json({ success: false });
      }

      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  };

  /**
   * Retrieves opensea stats based on the collection address.
   * @return {Response} Response when finished.
   */
  public stats = async (req: Request, res: Response) => {
    if (req.method === "POST") {
      const { contractAddress } = req.body;
      const collectionData: any = await utils.fetchContract(contractAddress);
      const slug: string = collectionData?.collection?.slug;
      const collection: any = await utils.fetchCollection(slug);
      return res.status(200).json({ success: collection });
    } else {
      return res.status(400).json({ success: false });
    }
  };

  /**
   * Deletes a new table called contracts.
   * @return {Response} Response when finished.
   */
  public deleteTable = async (req: Request, res: Response) => {
    if (
      req.method === "GET" &&
      req.headers.authorization === "dNxFKxkBDd1S4cF89fBpOdGMiUtOWK6b"
    ) {
      await this.db.deleteTable("contracts");
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  };

  /**
   * Creates a new table called contracts.
   * @return {Response} Response when finished.
   */
  public createTable = async (req: Request, res: Response) => {
    if (
      req.method === "GET" &&
      req.headers.authorization === "dNxFKxkBDd1S4cF89fBpOdGMiUtOWK6b"
    ) {
      await this.db.createTable("contracts");
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  };

  /**
   * Creates a new database called rarities.
   * @return {Response} Response when finished.
   */
  public createDB = async (req: Request, res: Response) => {
    if (
      req.method === "GET" &&
      req.headers.authorization === "dNxFKxkBDd1S4cF89fBpOdGMiUtOWK6b"
    ) {
      await this.db.createDB();
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  };

  /**
   * Deletes a new database called rarities.
   * @return {Response} Response when finished.
   */
  public deleteDB = async (req: Request, res: Response) => {
    if (
      req.method === "GET" &&
      req.headers.authorization === "dNxFKxkBDd1S4cF89fBpOdGMiUtOWK6b"
    ) {
      await this.db.deleteDB();
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  };

  /**
   * Delete all data within contracts table.
   * @return {Response} Response when finished.
   */
  public deleteData = async (req: Request, res: Response) => {
    if (
      req.method === "GET" &&
      req.headers.authorization === "dNxFKxkBDd1S4cF89fBpOdGMiUtOWK6b"
    ) {
      await this.db.deleteData("contracts");
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  };
}
