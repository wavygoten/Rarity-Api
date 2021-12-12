import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Tabs from "./components/Tabs";
import { useMediaQuery, mediaOptions } from "./hooks/useMediaQuery";
import axios from "axios";

function App() {
	const [searchContract, setSearchContract] = React.useState<string>("");
	const [searchToken, setSearchToken] = React.useState<string>("");
	const [stats, setStats] = React.useState<any>([]);
	const [data, setData] = React.useState<any>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	let isTablet = useMediaQuery(mediaOptions.md);

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
				url: "https://traitsurfer.app/api/stats", // production
				data: {
					contractAddress: searchContract,
				},
			})
				.then((res: any) => {
					if (res?.data?.success?.collection?.name !== "undefined") {
						setStats(res?.data?.success?.collection);
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
				url: `https://traitsurfer.app/api/${searchContract}`, // production
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
			<Navbar
				isTablet={isTablet}
				onChange={handleChange}
				onClick={contractSearchClick}
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
				loading={loading}
				searchToken={searchToken}
				onChange={handleChange}
			/>
			{/* End of Tabs Section */}
		</div>
	);
}

export default App;
