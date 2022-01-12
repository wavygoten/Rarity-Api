import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Tabs from "./components/Tabs";
import { useMediaQuery, mediaOptions } from "./hooks/useMediaQuery";
import axios from "axios";
import Swal from "sweetalert2";

declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}
function App() {
  const [searchContract, setSearchContract] = React.useState<string>("");
  const [searchToken, setSearchToken] = React.useState<string>("");
  const [stats, setStats] = React.useState<any>([]);
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string | undefined>("");
  const [address, setAddress] = React.useState<string | undefined>("");

  let isTablet = useMediaQuery(mediaOptions.md);
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3500,

    // didOpen: (toast) => {
    //   toast.addEventListener("mouseenter", Swal.stopTimer);
    //   toast.addEventListener("mouseleave", Swal.resumeTimer);
    // },
  });

  function matchExact(r: string, str: string) {
    try {
      var match = str?.match(r);
      return match && str === match?.[0];
    } catch (error: any) {}
  }
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
        // url: "http://localhost:9785/api/stats",
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
        // url: `http://localhost:9785/api/${searchContract}`,
      })
        .then((res: any) => {
          setLoading(false);
          if (res?.data?.success?.data) {
            console.log("Contract data fetched");
            setData(res?.data?.success?.data);
            Toast.fire({
              icon: "success",
              titleText: "Contract data fetched",
              width: "20rem",
            });
          } else {
            console.log("Contract data doesn't exist");
            setData([]);
            Toast.fire({
              icon: "error",
              titleText: "Contract data doesn't exist",
              width: "22rem",
            });
          }
        })
        .catch((err: any) => {
          console.error(err);
        });
    } else {
      Toast.fire({
        icon: "error",
        titleText: "Please enter a contract address",
        width: "25rem",
      });
    }
  }

  async function metamaskClick() {
    const _ = await UseWeb3();
    setAddress(_?.address);
    setStatus(_?.status);
  }

  React.useEffect(() => {
    const __ = async () => {
      const _ = await getCurrentWalletConnected();
      setAddress(_?.address);
      setStatus(_?.status);
    };
    __();
  }, [status, address]);

  return (
    <div className="main-wrapper">
      {/* Navbar Section */}
      <Navbar
        isTablet={isTablet}
        onChange={handleChange}
        onClick={contractSearchClick}
        onMetaMaskClick={metamaskClick}
        statusMsg={status}
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
        matchExact={matchExact}
      />
      {/* End of Tabs Section */}
    </div>
  );
  async function UseWeb3() {
    try {
      if (window.ethereum) {
        // Ask User permission to connect to Metamask
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          Toast.fire({
            icon: "success",
            titleText: "Successfully connected to MetaMask",
            width: "27rem",
          });
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
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          Toast.fire({
            icon: "success",
            titleText: "Successfully connected to MetaMask",
            width: "27rem",
          });
          return {
            address: addressArray[0],
            status: `${addressArray[0].slice(0, 6)}...${addressArray[0].slice(
              -4
            )}`,
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
}

export default App;
