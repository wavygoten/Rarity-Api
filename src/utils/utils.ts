import fetch from "cross-fetch";
var apiKey: string = "6a5959ab6ed841278cb3545d4f4acc4a";
var data: any = {
	name: [],
	contract: [],
	traits: [],
	opensea: [],
	image: [],
	score: [],
	rank: [],
};
const _ = {
	/**
	 * Fetch user opensea account data.
	 * @return {Promise} Response data in JSON.
	 */
	async fetchUserData(address: string) {
		return await fetch(`https://api.opensea.io/user/${address}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((res: any) => {
				return res.json();
			})
			.catch((err: any) => {
				console.log(err);
			});
	},

	/**
	 * Fetch opensea contract data.
	 * @return {Promise} Response data in JSON.
	 */
	async fetchContract(contract: string) {
		return await fetch(
			`https://api.opensea.io/api/v1/asset_contract/${contract}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"X-API-KEY": apiKey,
				},
			}
		)
			.then((res: any) => {
				return res.json();
			})
			.catch((err: any) => {
				console.log(err);
			});
	},

	/**
	 * Fetch opensea collection stats data.
	 * @return {Promise} Response data in JSON.
	 */
	async fetchCollectionStats(slug: string) {
		return await fetch(
			`https://api.opensea.io/api/v1/collection/${slug}/stats`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"X-API-KEY": apiKey,
				},
			}
		)
			.then((res: any) => {
				return res.json();
			})
			.catch((err: any) => {
				console.log(err);
			});
	},

	/**
	 * Fetch opensea collection data.
	 * @return {Promise} Response data in JSON.
	 */
	async fetchCollection(slug: string) {
		return await fetch(`https://api.opensea.io/api/v1/collection/${slug}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-KEY": apiKey,
			},
		})
			.then((res: any) => {
				return res.json();
			})
			.catch((err: any) => {
				console.log(err);
			});
	},

	/**
	 * Fetch single opensea assets 1 by 1 to end.
	 * @return {Promise} Postgres import data in JSON.
	 */
	async fetchAssets(contract: string, supply: number, traitRarities: any) {
		let result: any = [];
		let error: boolean = false;
		if (data.contract.indexOf(contract) === -1) {
			for (let i = 0; i < supply; i++) {
				let score: number = 0;
				await fetch(`https://api.opensea.io/api/v1/asset/${contract}/${i}`, {
					method: "GET",
					headers: {
						Accept: "application/json",
						"X-API-KEY": apiKey,
					},
				})
					.then((res: any) => res.json())
					.then((res: any) => {
						// calculate rarity score and match
						for (let i: number = 0; i < res?.traits.length; i++) {
							for (let j: number = 0; j < traitRarities.length; j++) {
								if (
									res?.traits[i]?.value.toLowerCase() ===
									traitRarities[j]?.name.toLowerCase()
								) {
									score += traitRarities[j]?.calculation;
								}
							}
						}
						result.push({
							name: res?.name,
							tokenid: res?.token_id,
							contract: contract,
							traits: res?.traits,
							opensea: res?.permalink,
							image: res?.image_url,
							score: score,
						});
						data?.contract.push(contract);
					})
					.catch((err: any) => {
						console.log(err);
						error = true;
					});
				if (error) {
					break;
				}
				await this.sleep(500);
			}
		} else {
			return [];
		}

		return result;
	},

	/**
	 * Fetch multiple opensea assets (30) to end.
	 * @return {Promise} Postgres import data in JSON.
	 */
	async fetchMultipleAssets(
		contract: string,
		supply: number,
		traitRarities: any
	) {
		let result: any = [];
		let error: boolean = false;
		const scores: any = [];
		let ranked: any = [];

		if (data.contract.indexOf(contract) === -1) {
			for (let i = 0; i < supply; i += 30) {
				const params = new URLSearchParams();
				for (let j = i; j < i + 30; j++) {
					params.append("token_ids", `${j}`);
				}
				params.append("asset_contract_address", contract);
				params.append("order_direction", "asc");
				params.append("offset", "0");
				params.append("limit", "30");
				await fetch(`https://api.opensea.io/api/v1/assets?${params}`, {
					method: "GET",
					headers: {
						Accept: "application/json",
						"X-API-KEY": apiKey,
					},
				})
					.then((res: any) => res.json())
					.then((res: any) => {
						for (let item in res?.assets) {
							let score: number = 0;
							const scores: any = [];

							// calculate rarity score and match
							for (
								let i: number = 0;
								i < res?.assets[item]?.traits.length;
								i++
							) {
								for (let j: number = 0; j < traitRarities.length; j++) {
									if (
										res?.assets[item]?.traits[i]?.value.toLowerCase() ===
										traitRarities[j]?.name.toLowerCase()
									) {
										score += traitRarities[j]?.calculation;
									}
								}
							}
							result.push({
								name: res?.assets[item]?.name,
								tokenid: res?.assets[item]?.token_id,
								contract: contract,
								traits: res?.assets[item]?.traits,
								opensea: res?.assets[item]?.permalink,
								image: res?.assets[item]?.image_url,
								score: score,
							});
						}
					})
					.catch((err: any) => {
						console.log(err);
						error = true;
					});

				if (error) {
					break;
				}
				await this.sleep(5000);
			}
		} else {
			return [];
		}

		// --------- Ranking Function -----------
		result.forEach((element: any) => {
			scores.push(element?.score);
		});
		ranked = this.rank(scores);
		result.map((element: any, idx: number) => {
			element.rank = ranked[idx];
		});
		// --------- Ranking Function -----------

		return result;
	},

	/**
	 * Rarity function to calculate rarity scores
	 * @return {Promise} Rarity data in JSON.
	 */
	async checkRarity(data: any, supply: number) {
		let tempArr: any = [];
		let arr: any = [];
		for (let category in data) {
			tempArr.push(data[category]);
		}
		for (let i = 0; i < tempArr.length; i++) {
			for (let item in tempArr[i]) {
				let calculation: number = 0;
				calculation = parseFloat((1 / (tempArr[i][item] / supply)).toFixed(2));
				arr.push({
					name: item,
					count: tempArr[i][item],
					calculation: calculation,
				});
			}
		}
		return arr;
	},

	/**
	 * Ranking function to help sort data based on rarity score
	 * @return Ranking data in JSON.
	 */
	rank(arr: any) {
		let sorted = arr.slice().sort(function (a: number, b: number) {
			return b - a;
		});
		let ranks = arr.map(function (v: number) {
			return sorted.indexOf(v) + 1;
		});
		return ranks;
	},

	/**
	 * Sleeping function based on ms
	 * @return {Promise} Timeout based on how many milliseconds.
	 */
	async sleep(ms: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	},
};

export default _;
