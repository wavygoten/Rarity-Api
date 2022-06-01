import React, { useState, useEffect, useReducer, useMemo } from 'react'
import { Rarity_Content, Rarity_Navbar, Rarity_Stats } from '../components'
import { RarityContext } from '../contexts/Rarity.context'
import axios from '../handler/axios'
import { usePagination, useMediaQuery, mediaOptions } from '../hooks'
import Swal from 'sweetalert2'

declare var window: any

type Props = {}

const Rarities = (props: Props) => {
  const [address, setAddress] = useState<string | undefined>('')
  const [status, setStatus] = useState<string | undefined>('')
  const [searchContract, setSearchContract] = useState<string>('')
  const [searchToken, setSearchToken] = useState<string>('')
  const [stats, setStats] = React.useState<any>([])
  const [data, setData] = React.useState<any>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [sortVar, setSortVar] = React.useState<string>('')
  const [page, setPage] = React.useState<number>(1)

  const itemsPerPage: number = 20
  const _data = usePagination(data, itemsPerPage) // pagination;
  let isTablet = useMediaQuery(mediaOptions.md)

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    // background: theme.palette.primary.dark,
    // color: theme.palette.primary.light,
    timer: 3500,
  })
  const handleRequest = async (method: string, data: any, apiUrl: string) => {
    switch (method) {
      case 'GET':
        try {
          const dataResponse = await axios.get(`${apiUrl}/${data}`)
          setLoading(false)
          if (dataResponse?.data?.success?.data) {
            Toast.fire({
              icon: 'success',
              titleText: 'Contract data fetched',
              width: '20rem',
            })
            return setData(dataResponse?.data?.success?.data)
          } else {
            Toast.fire({
              icon: 'error',
              titleText: "Contract data doesn't exist",
              width: '22rem',
            })
            return setData([])
          }
        } catch (error: any) {
          console.error(error.message)
        }
        break
      case 'POST':
        try {
          const statsResponse = await axios.post(apiUrl, data)
          if (statsResponse?.data?.success?.collection?.name !== 'undefined') {
            setStats(statsResponse?.data?.success?.collection)
          } else {
            setStats([])
          }
        } catch (error: any) {
          if (error?.response?.status === 429) {
            Toast.fire({
              icon: 'error',
              titleText: 'Please wait a few minutes before searching.',
              width: '26rem',
            })
            setLoading(false)
          }
          console.error(error.message)
        }
        break
      default:
        break
    }
    return
  }

  async function contractSearchClick() {
    if (searchContract.length > 0) {
      setLoading(true)
      setData([])
      const statistics: void = await handleRequest(
        'POST',
        {
          contractAddress: searchContract,
        },
        '/stats',
      )
      const allData: void = await handleRequest('GET', searchContract, '')
      Promise.all([statistics, allData])
    } else {
      Toast.fire({
        icon: 'error',
        titleText: 'Please enter a contract address',
        width: '25rem',
      })
    }
  }

  const handleCardLink = (link: string) => {
    if (link?.includes('ipfs://')) {
      return `https://ipfs.io/ipfs/${link?.split('ipfs://')[1]}`
    } else if (link?.includes('ipfs')) {
      return `https://ipfs.io/ipfs/${link?.split('ipfs/')[1]}`
    } else {
      return link
    }
  }

  const handleNext = () => {
    setPage((page: number) => page + 1)
    _data.next()
  }

  const handlePrev = () => {
    if (page !== 1) {
      setPage((page: number) => page - 1)
      _data.prev()
    } else {
      _data.prev()
    }
  }

  function sortRank(data: any) {
    var obj = [...data]
    obj.sort((a, b) => a?.rank - b?.rank)
    setData(obj)
  }

  function sortToken(data: any) {
    var obj = [...data]
    obj.sort((a, b) => a?.tokenid - b?.tokenid)
    setData(obj)
  }
  function handleSort(e: any) {
    switch (e?.target?.value) {
      case 'token-id':
        setSortVar('token-id')
        break
      case 'rank':
        setSortVar('rank')
        break
    }
  }

  function matchExact(r: string, str: string) {
    try {
      var match = str?.match(r)
      return match && str === match?.[0]
    } catch (error: any) {}
  }

  async function metamaskClick() {
    const _ = await UseWeb3()
    setAddress(_?.address)
    setStatus(_?.status)
  }

  // sorter
  useMemo(() => {
    const sorter = () => {
      if (sortVar === 'rank') {
        sortRank(data)
      }
      if (sortVar === 'token-id') {
        sortToken(data)
      }
    }
    sorter()
  }, [sortVar])

  // web3
  useMemo(() => {
    const __ = async () => {
      const _ = await getCurrentWalletConnected()
      setAddress(_?.address)
      setStatus(_?.status)
    }
    __()
  }, [status, address])

  return (
    <RarityContext.Provider
      value={{
        Nav_onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          setSearchContract(e?.target?.value)
        },
        Nav_onClick: contractSearchClick,
        Nav_onMetaMaskClick: metamaskClick,
        Nav_walletAddress: status,
        Nav_loading: loading,
        Stats_collection: stats,
        Stats_contract: searchContract.length > 0 ? searchContract : '',
        Content_data: data,
        Content_handleCardLink: handleCardLink,
        Content_handleNext: handleNext,
        Content_handlePrev: handlePrev,
        Content_handleSort: handleSort,
        Content_itemsPerPage: itemsPerPage,
        Content_matchExact: matchExact,
        Content_onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          setSearchToken(e?.target?.value)
        },
        Content_page: page,
        Content_paginationData: _data,
        Content_searchToken: searchToken,
        isTablet: isTablet,
      }}
    >
      <Rarity_Navbar />
      <Rarity_Stats />
      <Rarity_Content />
    </RarityContext.Provider>
  )
  async function UseWeb3() {
    try {
      if (window.ethereum) {
        // Ask User permission to connect to Metamask
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          const chain = await window.ethereum.request({
            method: 'net_version',
          })
          if (chain == 1) {
            Toast.fire({
              icon: 'success',
              titleText: 'Successfully connected to MetaMask',
              width: '27rem',
            })
          } else {
            Toast.fire({
              icon: 'error',
              titleText: 'You are connected to the wrong chain',
              width: '27rem',
            })
          }
          return {
            address: accounts[0],
            status: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          }
        } catch (err: any) {
          console.log(err?.message)
          if (err?.message.includes('User rejected the request')) {
            Toast.fire({
              icon: 'error',
              titleText: 'Failed to connect to MetaMask',
              width: '24rem',
            })
            return {
              address: '',
              status: 'Connect to MetaMask',
            }
          } else {
            return {
              address: '',
              status: 'Connect to MetaMask',
            }
          }
        }
      } else if (window.web3) {
        return
      } else {
        return
      }

      // ...
    } catch (err: any) {
      console.log(err?.message)
      return
    }
  }

  async function getCurrentWalletConnected() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        })
        const chain = await window.ethereum.request({
          method: 'net_version',
        })
        if (accounts.length > 0) {
          if (chain == 1) {
            Toast.fire({
              icon: 'success',
              titleText: 'Successfully connected to MetaMask',
              width: '27rem',
            })
          } else {
            Toast.fire({
              icon: 'error',
              titleText: 'You are connected to the wrong chain',
              width: '27rem',
            })
          }
          return {
            address: accounts[0],
            status: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          }
        } else {
          Toast.fire({
            icon: 'error',
            titleText: 'Failed to connect to MetaMask',
            width: '24rem',
          })
          return {
            address: '',
            status: 'Connect to MetaMask',
          }
        }
      } catch (err) {
        return {
          address: '',
          status: 'Error Connecting to Wallet',
        }
      }
    } else {
      return {
        address: '',
        status: 'MetaMask must be installed',
      }
    }
  }
}

export default Rarities
