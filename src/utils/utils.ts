import fetch from "cross-fetch";
import { ethers } from "ethers";
import { DB } from "../db/db";
const db = new DB();
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
   * Fetch blockchain erc assets to end.
   * @return {Promise} Postgres import data in JSON.
   */
  async fetchBlockchainAssets(contractAddress: string) {
    let data: any = {
      data: [],
      attributes: [],
      score: [],
      rank: [],
    };
    let eachAttribute: any = [];
    let obj: any = {};
    let returnData: any[] = [];
    const WEB3_ENDPOINT = "wss://api.zmok.io/mainnet/srr9jzs6wdrgdlby";
    const abi = [
      "function name() view returns (string memory)",
      "function totalSupply() view returns (uint256)",
      "function tokenURI(uint256 _tokenId) view returns (string memory)",
      "function supportsInterface(bytes4 interfaceId) view returns (bool)",
    ];
    const { WebSocketProvider } = ethers.providers;
    const provider = new WebSocketProvider(WEB3_ENDPOINT);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const handleError = () => {
      return undefined;
    };
    let [name, totalSupply, tokenURI, all] = await Promise.all([
      contract.name().catch(handleError),
      contract.totalSupply().catch(handleError),
      contract.tokenURI(1).catch(handleError),
      contract,
    ]);

    const find = await db.findOne("contracts", "contract", contractAddress);
    if (!find?.data?.data) {
      for (let i = 7700; i < totalSupply.toNumber(); i++) {
        try {
          if (
            tokenURI.includes("ipfs") &&
            tokenURI.includes("json") &&
            !tokenURI.includes("https")
          ) {
            const fixtoken = tokenURI
              .slice(0, tokenURI.length - 6)
              .split("//")[1];
            console.log(fixtoken);
            try {
              ethers.utils
                .fetchJson("https://ipfs.io/ipfs/" + fixtoken + `${i}.json`)
                .then(async (res: any) => {
                  obj = {
                    contract: contractAddress,
                    image: res?.image,
                    name: res?.name,
                    opensea: `https://opensea.io/assets/${contractAddress}/${i}`,
                    tokenid: `${i}`,
                  };
                  returnData.push(obj);
                  data?.data.push(res);
                  data?.attributes.push(res?.attributes);
                  eachAttribute?.push(res?.attributes);
                });
            } catch (error: any) {
              throw new Error(error?.message);
            }
          } else if (tokenURI.includes("mypinata.cloud")) {
            const fixtoken =
              tokenURI.slice(0, tokenURI.length - 2).split("//")[1] + `/${i}`;
            console.log(fixtoken);
            try {
              ethers.utils
                .fetchJson("https://" + fixtoken)
                .then(async (res: any) => {
                  obj = {
                    contract: contractAddress,
                    image: res?.image,
                    name: res?.name,
                    opensea: `https://opensea.io/assets/${contractAddress}/${i}`,
                    tokenid: `${i}`,
                  };
                  returnData.push(obj);
                  data?.data.push(res);
                  data?.attributes.push(res?.attributes);

                  eachAttribute?.push(res?.attributes);
                });
            } catch (error: any) {
              throw new Error(error?.message);
            }
          } else if (
            !tokenURI.includes("ar") &&
            !tokenURI.includes("https") &&
            tokenURI.includes("ipfs")
          ) {
            const fixtoken = tokenURI
              .slice(0, tokenURI.length - 2)
              .split("//")[1];
            console.log(fixtoken);
            try {
              ethers.utils
                .fetchJson("https://ipfs.io/ipfs/" + fixtoken + `/${i}`)
                .then(async (res) => {
                  obj = {
                    contract: contractAddress,
                    image: res?.image,
                    name: res?.name,
                    opensea: `https://opensea.io/assets/${contractAddress}/${i}`,
                    tokenid: `${i}`,
                  };
                  returnData.push(obj);
                  data?.data.push(res);
                  data?.attributes.push(res?.attributes);
                  eachAttribute?.push(res?.attributes);
                });
            } catch (error: any) {
              throw new Error(error?.message);
            }
          } else if (!tokenURI.includes("ar")) {
            let othertoken = tokenURI.replace(`1`, `${i}`);

            if (tokenURI.includes("pinata.cloud")) {
              if (tokenURI.includes("gateway.pinata.cloud")) {
                othertoken = othertoken.replace(
                  "gateway.pinata.cloud",
                  "ipfs.io"
                );
              } else {
                othertoken = othertoken.replace("mypinata.cloud", "ipfs.io");
              }
            }
            console.log(othertoken);
            try {
              ethers.utils.fetchJson(othertoken).then(async (res) => {
                let image: string = "";
                if (res?.image.includes("pinata.cloud")) {
                  if (res?.image.includes("gateway.pinata.cloud")) {
                    image = res?.image.replace(
                      "gateway.pinata.cloud",
                      "ipfs.io"
                    );
                  } else {
                    image = res?.image.replace("mypinata.cloud", "ipfs.io");
                  }
                }
                obj = {
                  contract: contractAddress,
                  image: image,
                  name: res?.name,
                  opensea: `https://opensea.io/assets/${contractAddress}/${i}`,
                  tokenid: `${i}`,
                };
                returnData.push(obj);
                data?.data.push(res);
                data?.attributes.push(res?.attributes);
                eachAttribute?.push(res?.attributes);
              });
            } catch (error: any) {
              throw new Error(error?.message);
            }
          } else {
            break;
          }
          await this.sleep(50);
          continue;
        } catch (error: any) {
          console.error(error?.message);
          break;
        }
      }
      data.score = await checkRarity(eachAttribute, data);
      data.rank = this.rank(data.score);
    } else {
      // rescrape and update ?
      return returnData;
    }
    returnData.forEach((element: any, idx: number) => {
      element.traits = data.attributes[idx];
    });
    returnData.forEach((element: any, idx: number) => {
      element.score = data.score[idx];
    });
    returnData.forEach((element: any, idx: number) => {
      element.rank = data.rank[idx];
    });
    returnData.push(obj);
    return returnData;

    async function checkRarity(attributes: any, data: number) {
      let totalValueCount: number = 0;
      let returnValue: any = [];
      let groupedValues: any = [];
      let values: any = [];

      attributes.map((element: any) => {
        element.map((element: any) => {
          values.push(element?.value);
        });
      });

      totalValueCount = values.length;
      // group all elements in individual groups

      values.sort().reduce((r: any, current_item: any) => {
        if (current_item !== r) {
          groupedValues.push([]);
        }
        groupedValues[groupedValues.length - 1].push(current_item);
        return current_item;
      }, undefined);

      for (let i: number = 0; i < groupedValues.length; i++) {
        let calc: number = parseFloat(
          (1 / (groupedValues[i].length / attributes.length)).toFixed(2)
        );
        returnValue.push({ valueName: groupedValues[i], calculation: calc });
      }

      const raritySort = async (attributes: any, data: any) => {
        let tempArr: any = [];
        let eachTotal: number[] = [];
        attributes.map((element: any, idx: number) => {
          tempArr.push({
            name: element?.valueName[0],
            calc: element?.calculation,
          });
        });

        data?.attributes.map((element: any, idx: number) => {
          for (let item in element) {
            tempArr.filter((e: any) => {
              if (e?.name === element[item]?.value) {
                element[item].ranking = e?.calc;
              }
            });
          }
        });

        data?.attributes.map((element: any, idx: number) => {
          let total: number = 0;
          for (let item in element) {
            total += element[item]?.ranking;
          }
          eachTotal.push(parseFloat(total.toFixed(2)));
        });

        return eachTotal;
      };
      const returnVal = await raritySort(returnValue, data);

      return returnVal;
    }
  },

  /**
   * Rescrape blockchain erc assets to end.
   * @return {Promise} Postgres update data in JSON.
   */
  async rescrapeBlockchainAssets(contractAddress: string) {
    let data: any = {
      data: [],
      attributes: [],
      score: [],
      rank: [],
    };
    let eachAttribute: any = [];
    let obj: any = {};
    let returnData: any[] = [];
    const WEB3_ENDPOINT = "wss://api.zmok.io/mainnet/srr9jzs6wdrgdlby";
    const abi = [
      "function name() view returns (string memory)",
      "function totalSupply() view returns (uint256)",
      "function tokenURI(uint256 _tokenId) view returns (string memory)",
      "function supportsInterface(bytes4 interfaceId) view returns (bool)",
    ];
    const { WebSocketProvider } = ethers.providers;
    const provider = new WebSocketProvider(WEB3_ENDPOINT);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const handleError = () => {
      return undefined;
    };
    let [name, totalSupply, tokenURI, all] = await Promise.all([
      contract.name().catch(handleError),
      contract.totalSupply().catch(handleError),
      contract.tokenURI(1).catch(handleError),
      contract,
    ]);

    const find = await db.findOne("contracts", "contract", contractAddress);
    if (!find?.data?.data?.success) {
      for (let i = 1; i < totalSupply.toNumber(); i++) {
        try {
          if (tokenURI.includes("ipfs") && tokenURI.includes("json")) {
            const fixtoken = tokenURI
              .slice(0, tokenURI.length - 6)
              .split("//")[1];
            console.log(fixtoken);
            try {
              ethers.utils
                .fetchJson("https://ipfs.io/ipfs/" + fixtoken + `${i}.json`)
                .then(async (res: any) => {
                  obj = {
                    contract: contractAddress,
                    image: res?.image,
                    name: res?.name,
                    opensea: `https://opensea.io/assets/${contractAddress}/${i}`,
                    tokenid: `${i}`,
                  };
                  returnData.push(obj);
                  data?.data.push(res);
                  data?.attributes.push(res?.attributes);
                  eachAttribute?.push(res?.attributes);
                });
            } catch (error: any) {
              throw new Error(error?.message);
            }
          } else if (tokenURI.includes("mypinata.cloud")) {
            const fixtoken = tokenURI
              .slice(0, tokenURI.length - 2)
              .split("//")[1];
            console.log(fixtoken);
            try {
              ethers.utils
                .fetchJson("https://" + fixtoken + `/${i}`)
                .then(async (res: any) => {
                  obj = {
                    contract: contractAddress,
                    image: res?.image,
                    name: res?.name,
                    opensea: `https://opensea.io/assets/${contractAddress}/${i}`,
                    tokenid: `${i}`,
                  };
                  returnData.push(obj);
                  data?.data.push(res);
                  data?.attributes.push(res?.attributes);

                  eachAttribute?.push(res?.attributes);
                });
            } catch (error: any) {
              throw new Error(error?.message);
            }
          } else if (
            !tokenURI.includes("ar") &&
            !tokenURI.includes("https") &&
            tokenURI.includes("ipfs")
          ) {
            const fixtoken = tokenURI
              .slice(0, tokenURI.length - 2)
              .split("//")[1];
            console.log(fixtoken);
            try {
              ethers.utils
                .fetchJson("https://ipfs.io/ipfs/" + fixtoken + `/${i}`)
                .then(async (res) => {
                  obj = {
                    contract: contractAddress,
                    image: res?.image,
                    name: res?.name,
                    opensea: `https://opensea.io/assets/${contractAddress}/${i}`,
                    tokenid: `${i}`,
                  };
                  returnData.push(obj);
                  data?.data.push(res);
                  data?.attributes.push(res?.attributes);
                  eachAttribute?.push(res?.attributes);
                });
            } catch (error: any) {
              throw new Error(error?.message);
            }
          } else if (!tokenURI.includes("ar")) {
            let othertoken = tokenURI.replace(`1`, `${i}`);

            if (tokenURI.includes("pinata.cloud")) {
              if (tokenURI.includes("gateway.pinata.cloud")) {
                othertoken = othertoken.replace(
                  "gateway.pinata.cloud",
                  "ipfs.io"
                );
              } else {
                othertoken = othertoken.replace("mypinata.cloud", "ipfs.io");
              }
            }
            console.log(othertoken);
            try {
              ethers.utils.fetchJson(othertoken).then(async (res) => {
                let image: string = "";
                if (res?.image.includes("pinata.cloud")) {
                  if (res?.image.includes("gateway.pinata.cloud")) {
                    image = res?.image.replace(
                      "gateway.pinata.cloud",
                      "ipfs.io"
                    );
                  } else {
                    image = res?.image.replace("mypinata.cloud", "ipfs.io");
                  }
                }
                obj = {
                  contract: contractAddress,
                  image: image,
                  name: res?.name,
                  opensea: `https://opensea.io/assets/${contractAddress}/${i}`,
                  tokenid: `${i}`,
                };
                returnData.push(obj);
                data?.data.push(res);
                data?.attributes.push(res?.attributes);
                eachAttribute?.push(res?.attributes);
              });
            } catch (error: any) {
              throw new Error(error?.message);
            }
          } else {
            break;
          }
          await this.sleep(50);
          continue;
        } catch (error: any) {
          console.error(error?.message);
          break;
        }
      }
      data.score = await checkRarity(eachAttribute, data);
      data.rank = this.rank(data.score);
    } else {
      return returnData;
    }
    returnData.forEach((element: any, idx: number) => {
      element.traits = data.attributes[idx];
    });
    returnData.forEach((element: any, idx: number) => {
      element.score = data.score[idx];
    });
    returnData.forEach((element: any, idx: number) => {
      element.rank = data.rank[idx];
    });
    returnData.push(obj);
    return returnData;

    async function checkRarity(attributes: any, data: number) {
      let totalValueCount: number = 0;
      let returnValue: any = [];
      let groupedValues: any = [];
      let values: any = [];

      attributes.map((element: any) => {
        element.map((element: any) => {
          values.push(element?.value);
        });
      });

      totalValueCount = values.length;
      // group all elements in individual groups

      values.sort().reduce((r: any, current_item: any) => {
        if (current_item !== r) {
          groupedValues.push([]);
        }
        groupedValues[groupedValues.length - 1].push(current_item);
        return current_item;
      }, undefined);

      for (let i: number = 0; i < groupedValues.length; i++) {
        let calc: number = parseFloat(
          (1 / (groupedValues[i].length / attributes.length)).toFixed(2)
        );
        returnValue.push({ valueName: groupedValues[i], calculation: calc });
      }

      const raritySort = async (attributes: any, data: any) => {
        let tempArr: any = [];
        let eachTotal: number[] = [];
        attributes.map((element: any, idx: number) => {
          tempArr.push({
            name: element?.valueName[0],
            calc: element?.calculation,
          });
        });

        data?.attributes.map((element: any, idx: number) => {
          for (let item in element) {
            tempArr.filter((e: any) => {
              if (e?.name === element[item]?.value) {
                element[item].ranking = e?.calc;
              }
            });
          }
        });

        data?.attributes.map((element: any, idx: number) => {
          let total: number = 0;
          for (let item in element) {
            total += element[item]?.ranking;
          }
          eachTotal.push(parseFloat(total.toFixed(2)));
        });

        return eachTotal;
      };
      const returnVal = await raritySort(returnValue, data);

      return returnVal;
    }
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
