import React, { useContext } from 'react'
import { RarityContext } from '../../contexts/Rarity.context'

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
  } = useContext(RarityContext)
  return <div>Content</div>
}

export default Content
