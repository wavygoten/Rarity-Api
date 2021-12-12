import React from "react";
import Card from "./Card";
import SearchTokens from "./SearchTokens";
interface Props {
	data: any;
	loading: boolean;
	searchToken: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Tabs = (props: Props) => {
	function matchExact(r: string, str: string) {
		var match = str.match(r);
		return match && str === match[0];
	}
	return (
		<div className="tabs-wrapper flex flex-col sm:flex-row justify-between px-2 py-16 whitespace-nowrap">
			<div className="traits-container flex flex-col shadow-lg rounded-md text-sm mx-2 sm:mr-4 sm:ml-8 mb-4 sm:mb-0 max-h">
				<div className="flex flex-col p-5">
					<div className="flex mb-4 border-b border-gray-500 pb-2">
						<div>Collection Filter</div>
					</div>
					<SearchTokens
						name="tokenIds"
						placeholder="Token ID"
						onChange={props.onChange}
					/>
				</div>
			</div>
			<div className="cards-container flex flex-col flex-1 text-sm rounded-md mx-0 sm:ml-2 px-6">
				<div className="flex items-center justify-between mb-2">
					<div>{props.data?.length} Items</div>
					{props.data ? (
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
					{props.loading ? <>Loading</> : <></>}
					{props.data ? (
						React.Children.toArray(
							props.data?.map((element: any, idx: number) => {
								if (props.searchToken.length > 0) {
									if (matchExact(props.searchToken, element?.tokenid)) {
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
	);
};

export default Tabs;
