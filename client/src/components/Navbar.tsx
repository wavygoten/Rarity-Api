import React from "react";
import twitterlogo from "../images/twitter.svg";
import discordlogo from "../images/discord.svg";
import instagramlogo from "../images/instagram-icon.svg";
import metamasklogo from "../images/metamask.svg";
import Input from "./SearchInput";
declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}
interface Props {
  isTablet: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onMetaMaskClick?: (e: React.MouseEvent<HTMLElement>) => void;
  statusMsg?: string;
  errorMsg?: string;
}

const Navbar = (props: Props) => {
  return (
    <div className="navbar-wrapper flex justify-between items-center px-2 py-8 whitespace-nowrap">
      <div className="logo ml-0 sm:ml-8">Trait Surfer</div>
      <div className="search text-sm sm:text-md">
        <Input
          name="contractSearch"
          placeholder="Search collection by contract"
          onClick={props.onClick}
          onChange={props.onChange}
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
      <div className="wallet sm:mr-8" onClick={props.onMetaMaskClick}>
        <div className="wallet-container flex py-2 px-4 rounded-lg ease-linear duration-75 text-md">
          <div>
            <img src={metamasklogo} alt="" />
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

export default Navbar;
