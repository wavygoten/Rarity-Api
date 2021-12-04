var apiKey: string = "6a5959ab6ed841278cb3545d4f4acc4a";

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
	async fetchAssets(contract: string, supply: number) {
		let result: any = [];
		for (let i = 0; i < 1; i++) {
			await fetch(`https://api.opensea.io/api/v1/asset/${contract}/${i}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"X-API-KEY": apiKey,
				},
			})
				.then((res: any) => res.json())
				.then((res: any) => {
					result.push({
						name: res?.name,
						traits: res?.traits,
						opensea: res?.permalink,
						image: res?.image_preview_url,
					});
				})
				.catch((err: any) => {
					console.log(err);
				});
			await this.sleep(500);
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
