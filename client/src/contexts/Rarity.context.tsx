import React, { createContext } from 'react'

type ContextProps = {
  Nav_onChange?: React.ChangeEventHandler<HTMLInputElement>
  Nav_onClick?: (e: React.MouseEvent<HTMLElement>) => void
  Nav_onMetaMaskClick?: (e: React.MouseEvent<HTMLElement>) => void
  Nav_walletAddress?: string | undefined
  Nav_loading?: boolean
  Stats_collection?: any
  Stats_contract?: string
  Content_data: any
  Content_paginationData: any
  Content_searchToken: string
  Content_onChange: React.ChangeEventHandler<HTMLInputElement>
  Content_matchExact: any
  Content_handleSort: React.ChangeEventHandler<HTMLSelectElement>
  Content_itemsPerPage: number
  Content_handleNext: () => void
  Content_handlePrev: () => void
  Content_handleCardLink: (link: string) => string
  Content_page: number
  Content_traits: object
  isTablet: boolean
}

export const RarityContext = createContext<ContextProps>({} as ContextProps)
