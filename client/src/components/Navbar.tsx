import React from "react";
import { Twitter, Metamask, InstagramIcon, Discord } from "../images";
import { Input } from ".";
declare global {
	interface Window {
		ethereum?: any;
		web3?: any;
	}
}
interface Props {
	isTablet: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
	onMetaMaskClick: (e: React.MouseEvent<HTMLElement>) => void;
	statusMsg: string | undefined;
	loading: boolean;
}

export const Navbar = (props: Props) => {
	return (
		<div className="navbar-wrapper flex justify-between items-center px-2 py-8 whitespace-nowrap">
			<div className="logo ml-0 sm:ml-8">Trait Surfer</div>
			<div className="search text-sm sm:text-md">
				<Input
					name="contractSearch"
					placeholder="Search collection by contract"
					onClick={props.onClick}
					onChange={props.onChange}
					loading={props.loading}
				/>
			</div>
			<div className="links sm:flex sm:items-center hidden">
				{/* hide in mobile */}
				<div>
					<Twitter />
				</div>
				<div>
					<Discord />
				</div>{" "}
				<div>
					<InstagramIcon />
				</div>
			</div>
			<div className="wallet sm:mr-8" onClick={props.onMetaMaskClick}>
				<div className="wallet-container flex py-2 px-4 rounded-lg ease-linear duration-75 text-md">
					<div>
						<Metamask />
					</div>
					{props.isTablet ? (
						<div
							className="hidden sm:inline-flex"
							style={{ marginLeft: "0.5rem" }}
						>
							{props.statusMsg}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};
