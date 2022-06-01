import React, { useContext } from 'react'
import tw from 'twin.macro'
import { RarityContext } from '../../contexts/Rarity.context'
import { styles } from './styles/styles'
type Props = {}

const Stats = (props: Props) => {
  const { Stats_collection, Stats_contract } = useContext(RarityContext)

  return (
    <section className="stats">
      <div css={styles.statsWrapper}>
        <div css={styles.leftStack}>
          <div css={styles.leftHStack}>
            <div>
              <div tw="pb-2">Floor</div>
              {Stats_collection?.stats?.floor_price
                ? `Ξ ${Stats_collection?.stats?.floor_price}`
                : '___'}
            </div>
          </div>
          <div css={styles.leftHStack}>
            <div tw="pb-2">Volume</div>
            {Stats_collection?.stats?.total_volume
              ? `Ξ ${Stats_collection?.stats?.total_volume.toFixed(2)}`
              : '___'}
          </div>
          <div css={styles.leftHStack}>
            <div tw="pb-2">Owners</div>
            {Stats_collection?.stats?.num_owners
              ? Stats_collection?.stats?.num_owners
              : '___'}
          </div>
          <div css={styles.leftHStack}>
            <div tw="pb-2">Items</div>
            {Stats_collection?.stats?.count
              ? Stats_collection?.stats?.count
              : '___'}
          </div>
        </div>
        <div css={styles.rightStack}>
          <a
            href={`https://opensea.io/collection/${Stats_collection?.slug}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <span>
              {/* <img src={linklogo} alt="" /> */}
              <div tw=" pb-1 ml-2">Opensea</div>
            </span>{' '}
          </a>
          <a
            href={`https://etherscan.io/token/${Stats_contract}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <span>
              {/* <img src={linklogo} alt="" /> */}
              <div tw=" ml-2  pb-1 ">Etherscan</div>
            </span>{' '}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Stats
