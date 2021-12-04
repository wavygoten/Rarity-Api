import { Response, Request } from "express";
import { DB } from "../db/db";
import utils from "../utils/utils";
import { ethers } from "ethers";
import { OpenSeaPort, Network, EventType } from "opensea-js";
import { OrderSide } from "opensea-js/lib/types";

export class Routes {
	public db: DB;
	public cloudflareProvider: ethers.providers.JsonRpcProvider;
	public seaport: OpenSeaPort;
	constructor() {
		this.db = new DB();
		this.cloudflareProvider = new ethers.providers.JsonRpcProvider(
			"https://cloudflare-eth.com"
		);
		this.seaport = new OpenSeaPort(this.cloudflareProvider, {
			networkName: Network.Main,
			apiKey: "6a5959ab6ed841278cb3545d4f4acc4a",
		});
	}

	/**
	 * Fetch all data from route "/:address"
	 * @return {Response} Response when fetching specific data using url query.
	 */
	public index = async (req: Request, res: Response) => {
		if (req.method === "GET") {
			const contractAddress: string = req?.params?.contractaddress;
			const collectionData: any = await utils.fetchContract(contractAddress);
			const slug: string = collectionData?.collection?.slug;
			const collectionStats: any = await utils.fetchCollectionStats(slug);
			const collection: any = await utils.fetchCollection(slug);
			const traits: any = collection?.collection?.traits;
			const totalSupply: number = collectionStats?.stats?.count;
			const traitRarities: any = await utils.checkRarity(traits, totalSupply);
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
			const collectionStats: any = await utils.fetchCollectionStats(slug);
			const totalSupply: number = collectionStats?.stats?.count;
			const assets: any = await utils.fetchAssets(contractAddress, totalSupply);
			await this.db.insert(contractAddress, assets);
			return res.status(200).json({ success: true });
		} else {
			return res.status(400).json({ success: false });
		}
	};

	public deleteTable = async (req: Request, res: Response) => {
		await this.db.deleteTable();
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
		await this.db.deleteData();
		res.send({ success: true });
	};
}
