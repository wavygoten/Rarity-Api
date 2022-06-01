import React, { useContext } from 'react'
import { RarityContext } from '../../contexts/Rarity.context'
import { styles } from './styles/styles'
// import twitterlogo from '../images/twitter.svg'
// import discordlogo from '../images/discord.svg'
// import instagramlogo from '../images/instagram-icon.svg'
// import metamasklogo from '../images/metamask.svg'
type Props = {}

const Navbar = (props: Props) => {
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
        <div css={styles.searchContainer}>
          <input
            css={styles.input}
            name="contractSearch"
            placeholder="Search collection by contract"
            onChange={Nav_onChange}
          />
          <button css={styles.inputButton} onClick={Nav_onClick}>
            S
          </button>
        </div>
        <div css={styles.links}>
          <div>{/* <img src={twitterlogo} alt="" /> */}</div>
          <div>{/* <img src={discordlogo} alt="" /> */}</div>{' '}
          <div>{/* <img src={instagramlogo} alt="" /> */}</div>
        </div>
        <div css={styles.wallet}>
          <div css={styles.walletContainer}>
            <div>{/* <img src={metamasklogo} alt="" /> */}</div>
            <div
              className="hidden sm:inline-flex"
              style={{ marginLeft: '0.5rem' }}
            >
              {Nav_walletAddress}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
