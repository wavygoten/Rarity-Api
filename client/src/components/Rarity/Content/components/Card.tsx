import React from 'react'
import tw, { styled, css } from 'twin.macro'
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
  return (
    <div
      style={style}
      css={css`
        @media (prefers-color-scheme: dark) {
          background-image: linear-gradient(
            90deg,
            #1b1b1b 0%,
            #0e0e0e 40%,
            #121212 60%,
            #1b1b1b 100%
          );
        }
        background-image: linear-gradient(
          90deg,
          #e4e4e4 0%,
          #f1f1f1 40%,
          #ededed 60%,
          #e4e4e4 100%
        );
        width: 180px;
        height: 180px;
        border-radius: 6px;
        background-position: 0px 0px;
        background-repeat: repeat;
        animation: animatedBackground 5s linear infinite;
      `}
    ></div>
  )
}

const StyledCard = styled.div`
  @media screen and (min-width: 640px) {
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 1.125rem /** 18px */;
    line-height: 1.75rem /** 28px */;
    transition: 0.4s;
    min-width: 200px;
    min-height: 350px;
    max-width: 200px;
    max-height: 350px;
    width: 200px;
    height: 350px;

    .placeholder-image {
      width: 200px;
      height: 200px;
      border-radius: 6px;
      background-position: 0px 0px;
      background-repeat: repeat;
      animation: animatedBackground 5s linear infinite;
    }
  }
  @media only screen and (max-width: 480px) {
    flex: 0 0 40%;
  }
  position: absolute;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  line-height: 1.5rem;

  transition: 0.4s;
  min-width: 180px;
  min-height: 350px;
  max-width: 180px;
  max-height: 350px;
  width: 180px;
  height: 350px;
  * {
    margin: 0.25rem 0;
  }
  .opensea-card {
    background: linear-gradient(var(--hover-theme) 0 0) var(--p, 100%) 100% /
      var(--d, 0) 2px no-repeat;
    width: fit-content;
    padding-bottom: 0.25rem;
    &:hover {
      cursor: pointer;
      transition: 275ms, background-position 0s 0.3s;
      --d: 100%;
      --p: 0%;
    }
  }
`
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
    <StyledCard style={style}>
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
    </StyledCard>
  )
}
