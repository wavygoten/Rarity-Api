import React from "react";

import { Search } from "../images";
interface Props {
	placeholder?: string;
	className?: string;
	name?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchTokens = (props: Props) => {
	return (
		<div className="search-match flex items-center">
			<div style={{ minWidth: "24px" }}>
				<Search />
			</div>
			<input
				type="text"
				placeholder={props.placeholder}
				name={props.name}
				onChange={props.onChange}
				autoComplete="off"
				className="p-2 duration-50 ease-linear flex-1 ml-3"
			/>
		</div>
	);
};
