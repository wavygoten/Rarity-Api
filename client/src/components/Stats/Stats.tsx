import React, { useContext } from 'react'
import { RarityContext } from '../../contexts/Rarity.context'

type Props = {}

const Stats = (props: Props) => {
  const { Stats_collection, Stats_contract } = useContext(RarityContext)

  return <section className="stats">Stats</section>
}

export default Stats
