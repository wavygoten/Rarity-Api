import React from "react";
import { LinkIcon } from "../images";
interface Props {
	collection: any;
	contract: string;
}

export const Stats = (props: Props) => {
	return (
		<div className="stats-wrapper flex flex-wrap justify-center sm:justify-between px-2 py-12">
			<div className="stats-container sm:mx-0 flex text-lg text-center mb-12 md:mb-0">
				<div className="floors ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
					<div className="pb-2">Floor</div>
					<div>
						{props.collection?.collection?.total?.floor_price
							? `Ξ ${props.collection?.collection?.total?.floor_price}`
							: "___"}
					</div>
				</div>
				<div className="volume ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
					<div className="pb-2">Volume</div>
					<div>
						{props.collection?.collection?.total?.volume
							? `Ξ ${props.collection?.collection?.total?.volume.toFixed(2)}`
							: "___"}
					</div>
				</div>
				<div className="owners ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
					<div className="pb-2">Owners</div>
					<div>
						{props.collection?.collection?.total?.num_owners
							? props.collection?.collection?.total?.num_owners
							: "___"}
					</div>
				</div>
				<div className="items ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
					<div className="pb-2">Avg Price</div>
					<div>
						{props.collection?.collection?.total?.average_price
							? `Ξ ${props.collection?.collection?.total?.average_price.toFixed(
									2
							  )}`
							: "___"}
					</div>
				</div>
			</div>
			<div className="links-container sm:mx-0 flex items-center text-lg text-center">
				<a
					href={`https://opensea.io/collection/${props.collection?.slug}`}
					target="_blank"
					rel="noopener noreferrer nofollow"
				>
					<span className="mx-8 flex">
						<LinkIcon />
						<div className="opensea pb-1 ml-2">Opensea</div>
					</span>{" "}
				</a>
				<a
					href={`https://etherscan.io/token/${props.contract}`}
					target="_blank"
					rel="noopener noreferrer nofollow"
				>
					<span className="mx-8 flex">
						<LinkIcon />
						<div className="etherscan ml-2  pb-1 ">Etherscan</div>
					</span>{" "}
				</a>
			</div>
		</div>
	);
};
