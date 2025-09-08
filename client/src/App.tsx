import React from "react";
import "./App.css";
import { Navbar, Stats, Tabs } from "./components";
import { useMediaQuery, mediaOptions, usePagination } from "./hooks";
import axios from "./utils/axios";
import Swal from "sweetalert2";

declare global {
	interface Window {
		ethereum?: any;
		web3?: any;
	}
}

function App() {
	const [searchContract, setSearchContract] = React.useState<string>("");
	const [searchToken, setSearchToken] = React.useState<string>("");
	const [stats, setStats] = React.useState<any>([]);
	const [data, setData] = React.useState<any>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	// const [status, setStatus] = React.useState<string | undefined>("");
	// const [address, setAddress] = React.useState<string | undefined>("");
	const [sortVar, setSortVar] = React.useState<string>("");
	const [page, setPage] = React.useState<number>(1);
	const itemsPerPage: number = 20;
	const _data = usePagination(data, itemsPerPage); // pagination;

	let isTablet = useMediaQuery(mediaOptions.md);

	const Toast = Swal.mixin({
		toast: true,
		position: "bottom-end",
		showConfirmButton: false,
		timer: 3500,
	});

	const handleRequest = async (method: string, data: any, apiUrl: string) => {
		switch (method) {
			case "GET":
				try {
					const dataResponse = await axios.get(`${apiUrl}/${data}`);
					setLoading(false);
					if (dataResponse?.data?.success?.data) {
						Toast.fire({
							icon: "success",
							titleText: "Contract data fetched",
							width: "20rem",
						});
						return setData(dataResponse?.data?.success?.data);
					} else {
						Toast.fire({
							icon: "error",
							titleText: "Contract data doesn't exist",
							width: "22rem",
						});
						return setData([]);
					}
				} catch (error: any) {
					console.error(error.message);
				}
				break;
			case "POST":
				try {
					const statsResponse = await axios.post(apiUrl, data);
					if (statsResponse?.data?.success?.collection?.name !== "undefined") {
						setStats(statsResponse?.data?.success);
					} else {
						setStats([]);
					}
				} catch (error: any) {
					if (error?.response?.status === 429) {
						Toast.fire({
							icon: "error",
							titleText: "Please wait a few minutes before searching.",
							width: "26rem",
						});
						setLoading(false);
					}
					console.error(error.message);
				}
				break;
			default:
				break;
		}
		return;
	};

	const handleCardLink = (link: string) => {
		if (link?.includes("ipfs://")) {
			return `https://ipfs.io/ipfs/${link?.split("ipfs://")[1]}`;
		} else if (link?.includes("ipfs")) {
			return `https://ipfs.io/ipfs/${link?.split("ipfs/")[1]}`;
		} else {
			return link;
		}
	};

	function handleSort(e: any) {
		switch (e?.target?.value) {
			case "token-id":
				setSortVar("token-id");
				break;
			case "rank":
				setSortVar("rank");
				break;
		}
	}

	function sortRank(data: any) {
		var obj = [...data];
		obj.sort((a, b) => a?.rank - b?.rank);
		setData(obj);
	}

	function sortToken(data: any) {
		var obj = [...data];
		obj.sort((a, b) => a?.tokenid - b?.tokenid);
		setData(obj);
	}

	const handleNext = () => {
		setPage((page: number) => page + 1);
		_data.next();
	};

	const handlePrev = () => {
		if (page !== 1) {
			setPage((page: number) => page - 1);
			_data.prev();
		} else {
			_data.prev();
		}
	};

	function matchExact(r: string, str: string) {
		try {
			var match = str?.match(r);
			return match && str === match?.[0];
		} catch (error: any) {}
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
			setData([]);
			const statistics: void = await handleRequest(
				"POST",
				{
					contractAddress: searchContract,
				},
				"/stats"
			);
			const allData: void = await handleRequest("GET", searchContract, "");
			Promise.all([statistics, allData]);
		} else {
			Toast.fire({
				icon: "error",
				titleText: "Please enter a contract address",
				width: "25rem",
			});
		}
	}

	// async function metamaskClick() {
	// 	const _ = await UseWeb3();
	// 	setAddress(_?.address);
	// 	setStatus(_?.status);
	// }
	//sorter
	React.useEffect(() => {
		const sorter = () => {
			if (sortVar === "rank") {
				sortRank(data);
			}
			if (sortVar === "token-id") {
				sortToken(data);
			}
		};
		sorter();
	}, [data, sortVar]);

	// web3
	// React.useEffect(() => {
	// 	const __ = async () => {
	// 		const _ = await getCurrentWalletConnected();
	// 		setAddress(_?.address);
	// 		setStatus(_?.status);
	// 	};
	// 	__();
	// }, [status, address]);

	return (
		<div className="main-wrapper">
			{/* Navbar Section */}
			<Navbar
				isTablet={isTablet}
				onChange={handleChange}
				onClick={contractSearchClick}
				// onMetaMaskClick={metamaskClick}
				// statusMsg={status}
				loading={loading}
			/>
			{/* End of Navbar Section */}

			{/* Stats Section */}
			<Stats
				collection={stats}
				contract={searchContract.length > 0 ? searchContract : ""}
			/>
			{/* End of Stats Section */}

			{/* Tabs Section */}
			<Tabs
				data={data}
				paginationData={_data}
				searchToken={searchToken}
				onChange={handleChange}
				matchExact={matchExact}
				isTablet={isTablet}
				handleSort={handleSort}
				handleNext={handleNext}
				handlePrev={handlePrev}
				handleCardLink={handleCardLink}
				itemsPerPage={itemsPerPage}
				page={page}
			/>
			{/* End of Tabs Section */}
		</div>
	);
	// async function UseWeb3() {
	// 	try {
	// 		if (window.ethereum) {
	// 			// Ask User permission to connect to Metamask
	// 			try {
	// 				const accounts = await window.ethereum.request({
	// 					method: "eth_requestAccounts",
	// 				});
	// 				const chain = await window.ethereum.request({
	// 					method: "net_version",
	// 				});
	// 				if (chain === 1) {
	// 					Toast.fire({
	// 						icon: "success",
	// 						titleText: "Successfully connected to MetaMask",
	// 						width: "27rem",
	// 					});
	// 				} else {
	// 					Toast.fire({
	// 						icon: "error",
	// 						titleText: "You are connected to the wrong chain",
	// 						width: "27rem",
	// 					});
	// 				}
	// 				return {
	// 					address: accounts[0],
	// 					status: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
	// 				};
	// 			} catch (err: any) {
	// 				console.log(err?.message);
	// 				if (err?.message.includes("User rejected the request")) {
	// 					Toast.fire({
	// 						icon: "error",
	// 						titleText: "Failed to connect to MetaMask",
	// 						width: "24rem",
	// 					});
	// 					return {
	// 						address: "",
	// 						status: "Connect to MetaMask",
	// 					};
	// 				} else {
	// 					return {
	// 						address: "",
	// 						status: "Connect to MetaMask",
	// 					};
	// 				}
	// 			}
	// 		} else if (window.web3) {
	// 			return;
	// 		} else {
	// 			return;
	// 		}

	// 		// ...
	// 	} catch (err: any) {
	// 		console.log(err?.message);
	// 		return;
	// 	}
	// }

	// async function getCurrentWalletConnected() {
	// 	if (window.ethereum) {
	// 		try {
	// 			const accounts = await window.ethereum.request({
	// 				method: "eth_accounts",
	// 			});
	// 			const chain = await window.ethereum.request({
	// 				method: "net_version",
	// 			});
	// 			if (accounts.length > 0) {
	// 				if (chain === 1) {
	// 					Toast.fire({
	// 						icon: "success",
	// 						titleText: "Successfully connected to MetaMask",
	// 						width: "27rem",
	// 					});
	// 				} else {
	// 					Toast.fire({
	// 						icon: "error",
	// 						titleText: "You are connected to the wrong chain",
	// 						width: "27rem",
	// 					});
	// 				}
	// 				return {
	// 					address: accounts[0],
	// 					status: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
	// 				};
	// 			} else {
	// 				Toast.fire({
	// 					icon: "error",
	// 					titleText: "Failed to connect to MetaMask",
	// 					width: "24rem",
	// 				});
	// 				return {
	// 					address: "",
	// 					status: "Connect to MetaMask",
	// 				};
	// 			}
	// 		} catch (err) {
	// 			return {
	// 				address: "",
	// 				status: "Error Connecting to Wallet",
	// 			};
	// 		}
	// 	} else {
	// 		return {
	// 			address: "",
	// 			status: "MetaMask must be installed",
	// 		};
	// 	}
	// }
}

export default App;
