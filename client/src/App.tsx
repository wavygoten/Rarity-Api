import React from "react";
import "./App.css";
import Input from "./components/SearchInput";
import twitterlogo from "./images/twitter.svg";
import discordlogo from "./images/discord.svg";
import instagramlogo from "./images/instagram-icon.svg";
import metamasklogo from "./images/metamask.svg";
import linklogo from "./images/link.svg";
import { useMediaQuery, mediaOptions } from "./hooks/useMediaQuery";
function App() {
  let isTablet = useMediaQuery(mediaOptions.md);

  return (
    <div className="main-wrapper">
      {/* Navbar Section */}
      <div className="navbar-wrapper flex justify-between items-center px-2 py-8 whitespace-nowrap">
        <div className="logo ml-0 sm:ml-8">Trait Surfer</div>
        <div className="search text-sm sm:text-md">
          <Input
            name="contractSearch"
            placeholder="Search collection by contract"
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
        <div className="wallet sm:mr-8">
          <div className="wallet-container flex py-2 px-4 rounded-lg ease-linear duration-75 text-md">
            <div>
              <img src={metamasklogo} alt="" />
            </div>
            {isTablet ? (
              <div
                className="hidden sm:inline-flex"
                style={{ marginLeft: "0.5rem" }}
              >
                Connect to MetaMask
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* End of Navbar Section */}

      {/* Stats Section */}
      <div className="stats-wrapper flex flex-wrap justify-center sm:justify-between px-2 py-12">
        <div className="stats-container sm:mx-0 flex text-lg text-center mb-12 md:mb-0">
          <div className="floors ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
            <div className="pb-2">Floor</div>
            <div>___</div>
          </div>
          <div className="volume ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
            <div className="pb-2">Volume</div>
            <div>___</div>
          </div>
          <div className="owners ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
            <div className="pb-2">Owners</div>
            <div>___</div>
          </div>
          <div className="items ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500">
            <div className="pb-2">Items</div>
            <div>___</div>
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
      {/* End of Stats Section */}

      {/* Tabs Section */}
      <div className="tabs-wrapper flex flex-col sm:flex-row justify-between px-2 py-16 whitespace-nowrap">
        <div className="traits-container flex flex-col text-sm rounded-md mx-2 sm:mr-4 sm:ml-8 mb-4 sm:mb-0 py-3 px-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>Collection Filters</div>
            <div className="cursor-pointer border-b-2 border-transparent hover:border-gray-500 ease-linear duration-75">
              Filter
            </div>
          </div>
        </div>
        <div className="cards-container flex flex-col flex-1 text-sm rounded-md mx-2 sm:mr-8 py-3 px-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>hi</div>
          </div>
        </div>
      </div>
      {/* Content Section */}

      <div className="content-wrapper">
        <div className="filter"></div>
        <div className="cards-containe"></div>
      </div>
      {/* Footer Section */}
      <div className="footer-wrapper"></div>
    </div>
  );
}

export default App;
