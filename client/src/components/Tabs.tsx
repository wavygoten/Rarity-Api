import React from "react";
import Card from "./Card";
import SearchTokens from "./SearchTokens";
interface Props {
	data: any;
	loading: boolean;
	searchToken: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	matchExact?: any;
	isTablet?: any;
}

const Tabs = (props: Props) => {
	const ref = React.useRef<any>(null);
	const [width, setWidth] = React.useState<any>(ref?.current?.offsetWidth);
	const cardsPerRow = props.isTablet
		? Math.floor(width / 200)
		: Math.floor(width / 180);
	const fnTop = (idx: number) =>
		props.isTablet
			? Math.floor(idx / cardsPerRow) * 350 + "px"
			: Math.floor(idx / cardsPerRow) * 350 + "px";
	const fnLeft = (idx: number) =>
		props.isTablet
			? Math.floor(idx % cardsPerRow) * 200 + "px"
			: Math.floor(idx % cardsPerRow) * 180 + "px";
	const totalHeight = Math.ceil(12 / cardsPerRow) * 350;
	React.useEffect(() => {
		const updateWindowDimensions = () => {
			setWidth(ref?.current?.offsetWidth);
		};
		const setDimension = () => {
			setWidth(ref?.current?.offsetWidth);
		};
		window.addEventListener("resize", updateWindowDimensions);
		window.addEventListener("load", setDimension);
		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
			window.removeEventListener("load", setDimension);
		};
	}, [ref]);
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
			<div className="cards-container flex flex-col flex-1 text-sm rounded-md mx-2 sm:ml-2 sm:mr-6">
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
				<div
					ref={ref}
					className="cards relative"
					style={{ height: `${totalHeight}px` }}
				>
					{props.loading ? <>Loading</> : <></>}
					{props.data ? (
						React.Children.toArray(
							props.data?.map((element: any, idx: number) => {
								if (props.searchToken.length > 0) {
									if (props.matchExact(props?.searchToken, element?.tokenid)) {
										return (
											<Card
												src={element?.image}
												title={element?.name}
												score={element?.score.toFixed(2)}
												rank={element?.rank}
												opensea={element?.opensea}
											/>
										);
									}
								} else if (idx < 15) {
									return (
										<Card
											src={element?.image}
											title={element?.name}
											score={element?.score.toFixed(2)}
											rank={element?.rank}
											opensea={element?.opensea}
											style={{
												transform: `translate(${fnLeft(idx)}, ${fnTop(idx)})`,
											}}
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
