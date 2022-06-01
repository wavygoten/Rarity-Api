import React, { useContext } from 'react'
import tw from 'twin.macro'
import Image from 'next/image'
import { RarityContext } from '../../../contexts/Rarity.context'
import { useCards } from '../../../hooks'
import { styles } from './styles/styles'
import { Card } from './components/Card'
import searchlogo from '../../../../public/search.svg'
type Props = {}

const Content = (props: Props) => {
  const {
    Content_data,
    Content_handleCardLink,
    Content_handleNext,
    Content_handlePrev,
    Content_handleSort,
    Content_itemsPerPage,
    Content_matchExact,
    Content_onChange,
    Content_page,
    Content_paginationData,
    Content_searchToken,
    isTablet,
  } = useContext(RarityContext)
  const ref = React.useRef<any>(null)
  const cards = useCards(ref)
  const cardsPerRow = isTablet
    ? Math.floor(cards / 200)
    : Math.floor(cards / 180)
  const fnTop = (idx: number) =>
    isTablet
      ? Math.floor(idx / cardsPerRow) * 350 + 'px'
      : Math.floor(idx / cardsPerRow) * 350 + 'px'
  const fnLeft = (idx: number) =>
    isTablet
      ? Math.floor(idx % cardsPerRow) * 215 + 'px'
      : Math.floor(idx % cardsPerRow) * 200 + 'px'
  const totalHeight = Math.ceil(Content_itemsPerPage / cardsPerRow) * 350

  const data = [...Content_data]
  return (
    <section className="content">
      <div css={styles.contentWrapper}>
        <div css={styles.traitsContainer}>
          <div css={styles.collectionIndexContainer}>
            <div tw="flex mb-4 border-b border-gray-500 pb-2">
              <div>Collection Index</div>
            </div>
            <div tw="flex items-center">
              <div
                style={{
                  minWidth: 24,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Image src={searchlogo} alt="" />
              </div>
              <input
                type="text"
                name="tokenIds"
                placeholder="Token ID"
                onChange={Content_onChange}
                autoComplete="off"
                css={styles.input}
              />
            </div>
          </div>
        </div>
        <div css={styles.cardsContainer}>
          <div css={styles.paginationContainer}>
            <div>{Content_data?.length} Items</div>
            <div css={styles.pagination}>
              <div css={styles.paginationToggles} onClick={Content_handlePrev}>
                Prev
              </div>
              <div>{Content_page}</div>
              <div css={styles.paginationToggles} onClick={Content_handleNext}>
                Next
              </div>
            </div>
            <select
              css={styles.sort}
              onChange={(e: any) => Content_handleSort(e)}
            >
              <option value="token-id">Sort by Token ID</option>
              <option value="rank">Sort by Rank</option>
            </select>
          </div>
          <div
            className="cards"
            ref={ref}
            style={{
              height: totalHeight,
              position: 'relative',
            }}
          >
            {Content_data && !Content_searchToken
              ? React.Children.toArray(
                  Content_paginationData?.currentData()?.map(
                    (element: any, idx: number) => {
                      if (idx < Content_itemsPerPage) {
                        return (
                          <Card
                            key={idx}
                            src={Content_handleCardLink(element?.image)}
                            title={element?.name}
                            score={element?.score?.toFixed(2)}
                            rank={element?.rank}
                            opensea={element?.opensea}
                            style={{
                              transform: `translate(${fnLeft(idx)}, ${fnTop(
                                idx,
                              )})`,
                            }}
                          />
                        )
                      }
                      return <></>
                    },
                  ),
                )
              : React.Children.toArray(
                  data?.map((element: any, idx: number) => {
                    if (Content_searchToken.length > 0) {
                      if (
                        Content_matchExact(
                          Content_searchToken,
                          element?.tokenid,
                        )
                      ) {
                        return (
                          <Card
                            key={idx}
                            src={Content_handleCardLink(element?.image)}
                            title={element?.name}
                            score={element?.score?.toFixed(2)}
                            rank={element?.rank}
                            opensea={element?.opensea}
                            style={
                              isTablet
                                ? {
                                    position: 'sticky',
                                    top: '0.5rem',
                                  }
                                : {
                                    position: 'sticky',
                                    top: '9rem',
                                  }
                            }
                          />
                        )
                      }
                    }
                    return <></>
                  }),
                )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Content
