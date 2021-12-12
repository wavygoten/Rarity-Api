import React from "react";
import linklogo from "../images/link.svg";

interface Props {
	stats: any;
}

const Stats = (props: Props) => {
	return (
		<div className="stats-wrapper flex flex-wrap justify-center sm:justify-between px-2 py-12">
			<div className="stats-container sm:mx-0 flex text-lg text-center mb-12 md:mb-0">
				<div className="floors ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
					<div className="pb-2">Floor</div>
					<div>
						{props.stats?.floor_price ? `Ξ ${props.stats?.floor_price}` : "___"}
					</div>
				</div>
				<div className="volume ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
					<div className="pb-2">Volume</div>
					<div>
						{props.stats?.total_volume
							? `Ξ ${props.stats?.total_volume.toFixed(2)}`
							: "___"}
					</div>
				</div>
				<div className="owners ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
					<div className="pb-2">Owners</div>
					<div>{props.stats?.num_owners ? props.stats?.num_owners : "___"}</div>
				</div>
				<div className="items ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
					<div className="pb-2">Items</div>
					<div>{props.stats?.count ? props.stats?.count : "___"}</div>
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
	);
};

export default Stats;
