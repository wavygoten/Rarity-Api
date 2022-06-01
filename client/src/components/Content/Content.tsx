import React, { useContext } from 'react'
import tw, { css } from 'twin.macro'
import { RarityContext } from '../../contexts/Rarity.context'
import { useCards } from '../../hooks'
import { styles } from './styles/styles'
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
          <div tw="flex flex-col p-5">
            <div tw="flex mb-4 border-b border-gray-500 pb-2">
              <div>Collection Index</div>
            </div>
            <div tw="flex items-center">
              <div style={{ minWidth: 24 }}>{/* <img src="" alt="" /> */}</div>
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
              className="sort-select"
              tw="shadow-md"
              onChange={(e: any) => Content_handleSort(e)}
            >
              <option value="token-id">Sort by Token ID</option>
              <option value="rank">Sort by Rank</option>
            </select>
          </div>
          <div
            className="cards"
            ref={ref}
            css={css`
              height: ${totalHeight}px;
              position: relative;
            `}
          >
            {Content_data && !Content_searchToken
              ? React.Children.toArray(
                  Content_paginationData?.currentData()?.map(
                    (element: any, idx: number) => {
                      if (idx < Content_itemsPerPage) {
                        return <div className="card">Card</div>
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
                        return <div className="card">Card</div>
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
