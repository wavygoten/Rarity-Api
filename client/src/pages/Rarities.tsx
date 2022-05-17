import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Navbar, Stats } from "../components";
import { RarityContext } from "../contexts/Rarity.context";
import axios from "../handler/axios";
import { useTheme } from "@mui/material";
import Swal from "sweetalert2";
declare var window: any;

type Props = {};

export const Rarities = (props: Props) => {
	const [address, setAddress] = useState<string | undefined>("");
	const [status, setStatus] = useState<string | undefined>("");
	const [searchContract, setSearchContract] = useState<string>("");
	const [searchToken, setSearchToken] = useState<string>("");
	const [stats, setStats] = React.useState<any>([]);
	const [data, setData] = React.useState<any>([]);
	const [loading, setLoading] = React.useState<boolean>(false);

	const theme = useTheme();
	const Toast = Swal.mixin({
		toast: true,
		position: "bottom-end",
		showConfirmButton: false,
		background: theme.palette.primary.dark,
		color: theme.palette.primary.light,
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
						setStats(statsResponse?.data?.success?.collection);
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
			// fire toast saying please enter contract address
		}
	}

	async function metamaskClick() {
		const _ = await UseWeb3();
		setAddress(_?.address);
		setStatus(_?.status);
	}
	useMemo(() => {
		const __ = async () => {
			const _ = await getCurrentWalletConnected();
			setAddress(_?.address);
			setStatus(_?.status);
		};
		__();
	}, [status, address]);

	return (
		<RarityContext.Provider
			value={{
				Nav_onChange: (
					e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
				) => {
					setSearchContract(e?.target?.value);
				},
				Nav_onClick: contractSearchClick,
				Nav_onMetaMaskClick: metamaskClick,
				Nav_walletAddress: status,
				Nav_loading: loading,
				Stats_collection: stats,
				Stats_contract: searchContract,
			}}
		>
			<Navbar />
			<Stats />
		</RarityContext.Provider>
	);
	async function UseWeb3() {
		try {
			if (window.ethereum) {
				// Ask User permission to connect to Metamask
				try {
					const accounts = await window.ethereum.request({
						method: "eth_requestAccounts",
					});
					const chain = await window.ethereum.request({
						method: "net_version",
					});
					if (chain == 1) {
						Toast.fire({
							icon: "success",
							titleText: "Successfully connected to MetaMask",
							width: "27rem",
						});
					} else {
						Toast.fire({
							icon: "error",
							titleText: "You are connected to the wrong chain",
							width: "27rem",
						});
					}
					return {
						address: accounts[0],
						status: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
					};
				} catch (err: any) {
					console.log(err?.message);
					if (err?.message.includes("User rejected the request")) {
						Toast.fire({
							icon: "error",
							titleText: "Failed to connect to MetaMask",
							width: "24rem",
						});
						return {
							address: "",
							status: "Connect to MetaMask",
						};
					} else {
						return {
							address: "",
							status: "Connect to MetaMask",
						};
					}
				}
			} else if (window.web3) {
				return;
			} else {
				return;
			}

			// ...
		} catch (err: any) {
			console.log(err?.message);
			return;
		}
	}

	async function getCurrentWalletConnected() {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: "eth_accounts",
				});
				const chain = await window.ethereum.request({
					method: "net_version",
				});
				if (accounts.length > 0) {
					if (chain == 1) {
						Toast.fire({
							icon: "success",
							titleText: "Successfully connected to MetaMask",
							width: "27rem",
						});
					} else {
						Toast.fire({
							icon: "error",
							titleText: "You are connected to the wrong chain",
							width: "27rem",
						});
					}
					return {
						address: accounts[0],
						status: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
					};
				} else {
					Toast.fire({
						icon: "error",
						titleText: "Failed to connect to MetaMask",
						width: "24rem",
					});
					return {
						address: "",
						status: "Connect to MetaMask",
					};
				}
			} catch (err) {
				return {
					address: "",
					status: "Error Connecting to Wallet",
				};
			}
		} else {
			return {
				address: "",
				status: "MetaMask must be installed",
			};
		}
	}
};
