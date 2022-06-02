import React, { useContext } from 'react'
import tw from 'twin.macro'
import Image from 'next/image'
import { RarityContext } from '../../../contexts/Rarity.context'
import { styles } from './styles/styles'
import twitterlogo from '../../../../public/twitter.svg'
import discordlogo from '../../../../public/discord.svg'
import instagramlogo from '../../../../public/instagram-icon.svg'
import metamasklogo from '../../../../public/metamask.svg'
import searchlogo from '../../../../public/search.svg'

const Navbar = () => {
  const {
    Nav_onChange,
    Nav_onClick,
    Nav_onMetaMaskClick,
    Nav_walletAddress,
    Nav_loading,
  } = useContext(RarityContext)
  return (
    <nav className="navbar">
      <div css={styles.navbarWrapper}>
        <div css={styles.logo}>Trait Surfer</div>
        <div css={styles.search}>
          <div css={styles.searchContainer}>
            <input
              type="text"
              css={styles.input}
              name="contractSearch"
              placeholder="Search collection by contract"
              onChange={Nav_onChange}
            />
            <button css={styles.inputButton} onClick={Nav_onClick}>
              <div css={styles.center}>
                <Image width={24} height={24} src={searchlogo} alt="" />
              </div>
            </button>
          </div>
        </div>
        <div css={styles.links}>
          <div css={styles.center}>
            <Image width={24} height={24} src={twitterlogo} alt="" />
          </div>
          <div css={styles.center}>
            <Image width={24} height={24} src={discordlogo} alt="" />
          </div>{' '}
          <div css={styles.center}>
            <Image width={24} height={24} src={instagramlogo} alt="" />
          </div>
        </div>
        <div css={styles.wallet} onClick={Nav_onMetaMaskClick}>
          <div css={styles.walletContainer}>
            <div css={styles.center}>
              <Image width={24} height={24} src={metamasklogo} alt="" />
            </div>
            <div tw="hidden sm:inline-flex" style={{ marginLeft: '0.5rem' }}>
              {Nav_walletAddress ? Nav_walletAddress : 'Connect to MetaMask'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
