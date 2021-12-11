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
				"contract",
				`${contractAddress}`
			);
			return res.status(200).json({ success: postgresData });
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
				await this.db.insert(contractAddress, assets);
			} else {
				return res.status(201).json({ success: false });
			}

			return res.status(200).json({ success: true });
		} else {
			return res.status(400).json({ success: false });
		}
	};

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

	public deleteTable = async (req: Request, res: Response) => {
		// await this.db.deleteTable();
		res.send({ success: true });
	};

	public createTable = async (req: Request, res: Response) => {
		await this.db.createTable();
		res.send({ success: true });
	};

	public createDB = async (req: Request, res: Response) => {
		res.send({ success: true });
	};

	public deleteDB = async (req: Request, res: Response) => {
		res.send({ success: true });
	};

	public deleteData = async (req: Request, res: Response) => {
		// await this.db.deleteData();
		res.send({ success: true });
	};
}
