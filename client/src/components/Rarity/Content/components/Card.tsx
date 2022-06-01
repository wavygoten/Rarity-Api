import React from 'react'
import tw from 'twin.macro'
import { useImageRender } from '../../../../hooks/'
type PlaceHolderProps = {
  style: React.CSSProperties
}
type Props = {
  src: string
  title: string
  score: number
  rank: string
  opensea: string
  details?: any
  style: React.CSSProperties
}

const PlaceholderImage = ({ style }: PlaceHolderProps) => {
  return <div style={style} className="placeholder-image"></div>
}

export const Card = ({
  src,
  title,
  score,
  rank,
  opensea,
  details,
  style,
  ...args
}: Props) => {
  const imgEl = React.useRef<HTMLImageElement>(null)
  const loaded = useImageRender(imgEl)
  return (
    <div
      className="card"
      tw="absolute flex flex-col text-base sm:text-lg"
      style={style}
    >
      <PlaceholderImage
        style={!loaded ? { display: 'block' } : { display: 'none' }}
      />
      {src?.includes('.mp4') ? (
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          tw="rounded-md"
          src={src}
          style={loaded ? { display: 'inline-block' } : { display: 'none' }}
        />
      ) : (
        <img
          style={loaded ? { display: 'inline-block' } : { display: 'none' }}
          tw="rounded-md"
          src={src}
          ref={imgEl}
          alt=""
        />
      )}
      <div className="card-title">
        <div>{title}</div>
      </div>
      <div className="card-score" tw="text-sm">
        Score {score}
      </div>
      <div className="card-rank" tw="flex justify-between text-sm">
        <div>Rank {rank}</div>
      </div>
      <div className="opensea-card" tw="text-sm">
        <a href={opensea} target="_blank" rel="noopener noreferrer nofollow">
          Opensea
        </a>
      </div>
    </div>
  )
}
