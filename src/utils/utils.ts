import fetch from "cross-fetch";
var apiKey: string = "6a5959ab6ed841278cb3545d4f4acc4a";
var data: any = {
	name: [],
	contract: [],
	traits: [],
	opensea: [],
	image: [],
	score: [],
};
const _ = {
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
	async fetchMultipleAssets(
		contract: string,
		supply: number,
		traitRarities: any
	) {
		let result: any = [];
		let error: boolean = false;
		if (data.contract.indexOf(contract) === -1) {
			for (let i = 0; i < 60; i += 30) {
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
				await this.sleep(1000);
			}
		} else {
			return [];
		}
		return result;
	},

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
	async rank(arr: any) {
		let sorted = arr.slice().sort(function (a: number, b: number) {
			return b - a;
		});
		let ranks = arr.map(function (v: number) {
			return sorted.indexOf(v) + 1;
		});
		return ranks;
	},
	async sleep(ms: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	},
};

export default _;
