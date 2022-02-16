import { DB } from "../db/db";
import utils from "./utils";
import { ethers } from "ethers";
import fetch from "cross-fetch";
import fs from "fs";
import abi from "./testAbi.json";
// const abiDecoder = require("abi-decoder"); // NodeJS

/**
 * Watch contract events and fetch the metadata of ERC20 and ERC721 tokens
 */
export class watchContracts {
  private WEB3_ENDPOINT: string;
  private RPC_PROVIDER: ethers.providers.JsonRpcProvider;
  public db: DB;
  private WSS_ENDPOINT: ethers.providers.WebSocketProvider;
  constructor() {
    this.WEB3_ENDPOINT = "https://cloudflare-eth.com";
    this.RPC_PROVIDER = new ethers.providers.JsonRpcProvider(
      this.WEB3_ENDPOINT
    );
    this.WSS_ENDPOINT = new ethers.providers.WebSocketProvider(
      "wss://api.zmok.io/mainnet/srr9jzs6wdrgdlby"
    );
    this.db = new DB();
  }

  async getContractData(contractAddress: string) {
    const getAbi = async () => {
      const params = new URLSearchParams({
        module: "contract",
        action: "getabi",
        address: contractAddress,
        apikey: `DXZKJV45JYSX1BTGK6VYN294TWZM7549B9`,
      });

      return new Promise<object>(async (resolve, reject) => {
        await fetch(`https://api.etherscan.io/api?${params}`, {
          method: "GET",
        })
          .then((res: any) => res.json())
          .then((data: any) => {
            resolve(data);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    };
    // const abi = await getAbi()
    //   .then((res: any) => {
    //     return res?.result;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const abi = [
      "function name() view returns (string memory)",
      "function totalSupply() view returns (uint256)",
      "function tokenURI(uint256 _tokenId) view returns (string memory)",
      "function supportsInterface(bytes4 interfaceId) view returns (bool)",
    ];
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      this.RPC_PROVIDER
    );
    const handleError = () => {
      return undefined;
    };

    let [name, totalSupply, tokenURI, isERC721, isERC1155] = await Promise.all([
      contract.name().catch(handleError),
      contract.totalSupply().catch(handleError),
      contract.tokenURI(1).catch(handleError),
      contract.supportsInterface("0x80ac58cd").catch(handleError),
      contract.supportsInterface("0xd9b67a26").catch(handleError),
    ]);
    if (!totalSupply) {
      totalSupply = "10000";
    }
    return { name, totalSupply, tokenURI, isERC721, isERC1155 };
  }

  async checkRarity(attributes: any, data: number) {
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

  /**
   * Function to watch contracts and their events
   * @return Returns 0 if an error occurs, otherwise never stops
   */
  async watch() {
    // let eachAttribute: any = [];
    let blockNumber: number = await this.WSS_ENDPOINT.getBlockNumber();
    const checkBlock = async () => {
      const currentBlockNumber: number =
        await this.WSS_ENDPOINT.getBlockNumber();
      if (currentBlockNumber <= blockNumber) {
        console.log(blockNumber, "sleeping 10 secs");
        await utils.sleep(10000);
        await checkBlock();
      }
      return;
    };
    while (true) {
      try {
        const blocks = await this.WSS_ENDPOINT.getBlockWithTransactions(
          blockNumber
        );
        const contracts = blocks.transactions;
        for (let i = 0; i < contracts.length; i++) {
          const hash = contracts[i].hash;
          const receipt = await this.WSS_ENDPOINT.getTransactionReceipt(hash);
          if (receipt.contractAddress) {
            // found contract, log it.
            const metadata = await this.getContractData(
              receipt.contractAddress
            );
            // check if its an nft, if so add it to a postgresql list each row and expire after 2 months ?
            if (metadata.isERC721) {
              console.log(
                receipt.contractAddress,
                metadata.name,
                metadata.totalSupply.toNumber(),
                metadata.tokenURI
              );
              const data = {
                contractName: metadata.name,
                contractSupply: metadata.totalSupply.toNumber(),
                contractURI: metadata.tokenURI,
              };
              await this.db.createTable("listcontracts");
              await this.db.insert(
                "listcontracts",
                receipt.contractAddress,
                data
              );
              const found = await this.db.findOne(
                "listcontracts",
                "contract",
                receipt.contractAddress
              );
              console.log(found);
            }
          }
        }
        await checkBlock();
        console.log(blockNumber);
        blockNumber++;
      } catch (error: any) {
        console.log(error?.message);
        blockNumber++;
        continue;
      }
    }
  }
}
// this.WSS_ENDPOINT.on("block", async (blockNumber) => {
//   // Emitted on every block change
//   //   console.log(blockNumber);
//   try {
//     console.log(blockNumber);
//     const blocks = await this.WSS_ENDPOINT.getBlockWithTransactions(
//       blockNumber
//     );
//     //   const wai = await sum.transactions[1].wait();
//     //   console.log(
//     //     ethers.utils.defaultAbiCoder.decode(
//     //       ["bytes", "string"],
//     //       ethers.utils.hexDataSlice(sum.transactions[1].data, 4)
//     //     )
//     //   );

//     const contracts = blocks.transactions;
//     for (let i = 0; i < contracts.length; i++) {
//       const wait = await contracts[i].wait();
//       if (wait.contractAddress) {
//         // found contract, log it.
//         console.log(wait.contractAddress);
//       }
//     }
//     // const wait = await contracts[1].wait();

//     // console.log(wait.contractAddress);
//     // const hash = sum?.transactions?.[1]?.hash;
//     // const receipt = await this.WSS_ENDPOINT.getTransactionReceipt(hash);
//     // console.log(receipt);
//     //   console.log(abiDecoder.decodeLogs(receipt.logs));
//     //   console.log(hash, receipt);
//     //   console.log(this.iface.parseTransaction(sum.transactions[1]));
//     //   console.log(
//     //     sum.transactions[1].data,
//     //     sum.transactions[1].accessList,
//     //     sum.transactions[1].hash
//     //   );
//     //   fs.writeFileSync("test.json", JSON.stringify(sum.transactions));
//   } catch (error: any) {
//     console.log(error?.message);
//     if (error?.message.includes("transaction failed")) {
//       console.log("transaction fail");
//     }
//   }
// });
