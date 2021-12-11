import React from "react";
import "./App.css";
import Input from "./components/SearchInput";
import SearchTokens from "./components/SearchTokens";
import Card from "./components/Card";
import twitterlogo from "./images/twitter.svg";
import discordlogo from "./images/discord.svg";
import instagramlogo from "./images/instagram-icon.svg";
import metamasklogo from "./images/metamask.svg";
import linklogo from "./images/link.svg";
import { useMediaQuery, mediaOptions } from "./hooks/useMediaQuery";
import axios from "axios";

function App() {
	const [searchContract, setSearchContract] = React.useState<string>("");
	const [searchToken, setSearchToken] = React.useState<string>("");
	const [stats, setStats] = React.useState<any>([]);
	const [data, setData] = React.useState<any>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	let isTablet = useMediaQuery(mediaOptions.md);
	function matchExact(r: any, str: any) {
		var match = str.match(r);
		return match && str === match[0];
	}
	async function handleChange(e: any) {
		switch (e?.target?.name) {
			case "contractSearch":
				setSearchContract(e?.target?.value);
				break;
			case "tokenIds":
				setSearchToken(e?.target?.value);
				break;
			default:
				break;
		}
	}
	async function contractSearchClick() {
		if (searchContract.length > 0) {
			setLoading(true);
			await axios({
				method: "POST",
				url: "http://traitsurfer.app/api/stats",
				data: {
					contractAddress: searchContract,
				},
			})
				.then((res: any) => {
					if (res?.data?.success?.collection?.name !== "undefined") {
						setStats(res?.data?.success?.collection?.stats);
					} else {
						console.log("No collection found with stats");
						setStats([]);
					}
				})
				.catch((err: any) => {
					console.error(err);
				});
			await axios({
				method: "GET",
				url: `http://traitsurfer.app/api/${searchContract}`,
			})
				.then((res: any) => {
					setLoading(false);
					if (res?.data?.success?.data) {
						console.log("Contract data fetched");
						setData(res?.data?.success?.data);
					} else {
						console.log("Contract data doesn't exist");
						setData([]);
					}
				})
				.catch((err: any) => {
					console.error(err);
				});
		} else {
			console.log("Please enter a contract address");
		}
	}

	return (
		<div className="main-wrapper">
			{/* Navbar Section */}
			<div className="navbar-wrapper flex justify-between items-center px-2 py-8 whitespace-nowrap">
				<div className="logo ml-0 sm:ml-8">Trait Surfer</div>
				<div className="search text-sm sm:text-md">
					<Input
						name="contractSearch"
						placeholder="Search collection by contract"
						onClick={contractSearchClick}
						onChange={handleChange}
					/>
				</div>
				<div className="links sm:flex sm:items-center hidden">
					{/* hide in mobile */}
					<div>
						<img src={twitterlogo} alt="" />
					</div>
					<div>
						<img src={discordlogo} alt="" />
					</div>{" "}
					<div>
						<img src={instagramlogo} alt="" />
					</div>
				</div>
				<div className="wallet sm:mr-8">
					<div className="wallet-container flex py-2 px-4 rounded-lg ease-linear duration-75 text-md">
						<div>
							<img src={metamasklogo} alt="" />
						</div>
						{isTablet ? (
							<div
								className="hidden sm:inline-flex"
								style={{ marginLeft: "0.5rem" }}
							>
								Connect to MetaMask
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
			{/* End of Navbar Section */}

			{/* Stats Section */}
			<div className="stats-wrapper flex flex-wrap justify-center sm:justify-between px-2 py-12">
				<div className="stats-container sm:mx-0 flex text-lg text-center mb-12 md:mb-0">
					<div className="floors ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
						<div className="pb-2">Floor</div>
						<div>{stats?.floor_price ? `Ξ ${stats?.floor_price}` : "___"}</div>
					</div>
					<div className="volume ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
						<div className="pb-2">Volume</div>
						<div>
							{stats?.total_volume
								? `Ξ ${stats?.total_volume.toFixed(2)}`
								: "___"}
						</div>
					</div>
					<div className="owners ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
						<div className="pb-2">Owners</div>
						<div>{stats?.num_owners ? stats?.num_owners : "___"}</div>
					</div>
					<div className="items ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
						<div className="pb-2">Items</div>
						<div>{stats?.count ? stats?.count : "___"}</div>
					</div>
				</div>
				<div className="links-container sm:mx-0 flex items-center text-lg text-center">
					<span className="mx-8 flex">
						<img src={linklogo} alt="" />
						<div className="opensea pb-1 ml-2">Opensea</div>
					</span>{" "}
					<span className="mx-8 flex">
						<img src={linklogo} alt="" />
						<div className="etherscan ml-2  pb-1 ">Etherscan</div>
					</span>{" "}
				</div>
			</div>
			{/* End of Stats Section */}

			{/* Tabs Section */}
			<div className="tabs-wrapper flex flex-col sm:flex-row justify-between px-2 py-16 whitespace-nowrap">
				<div className="traits-container flex flex-col shadow-lg rounded-md text-sm mx-2 sm:mr-4 sm:ml-8 mb-4 sm:mb-0 max-h">
					<div className="flex flex-col p-5">
						<div className="flex mb-4 border-b border-gray-500 pb-2">
							<div>Collection Filter</div>
						</div>
						<SearchTokens
							name="tokenIds"
							placeholder="Token ID"
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="cards-container flex flex-col flex-1 text-sm rounded-md mx-0 sm:ml-2 px-6">
					<div className="flex items-center justify-between mb-2">
						<div>{data?.length} Items</div>
						{data ? (
							<div className="pagination flex justify-center">
								<div className="previous mx-2">Prev</div>
								<div className="page-number mx-2">1</div>
								<div className="next mx-2">Next</div>
							</div>
						) : (
							<></>
						)}
						<select className="sort-select shadow-md">
							<option value="token-id">Sort by Token ID</option>
							<option value="rank">Sort by Rank</option>
						</select>
					</div>
					<div className="cards flex flex-wrap justify-between sm:justify-center">
						{loading ? <>Loading</> : <></>}
						{data ? (
							React.Children.toArray(
								data?.map((element: any, idx: number) => {
									if (searchToken.length > 0) {
										if (matchExact(searchToken, element?.tokenid)) {
											return (
												<Card
													src={element?.image}
													title={element?.name}
													score={element?.score.toFixed(2)}
													rank={element?.score.toFixed(2)}
													opensea={element?.opensea}
												/>
											);
										}
									} else if (idx < 12) {
										return (
											<Card
												src={element?.image}
												title={element?.name}
												score={element?.score.toFixed(2)}
												rank={element?.score.toFixed(2)}
												opensea={element?.opensea}
											/>
										);
									}
									return <></>;
								})
							)
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
			{/* End of Tabs Section */}

			{/* Footer Section */}
			<div className="footer-wrapper"></div>
			{/* End of Footer Section */}
		</div>
	);
}

export default App;
