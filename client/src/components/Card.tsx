import React from "react";
import { useImageRender } from "../hooks";
interface PlaceHolderProps {
  style: React.CSSProperties;
}
interface Props {
  src: string;
  title: string;
  score: number;
  rank: string;
  opensea: string;
  details?: any;
  style: React.CSSProperties;
}

const PlaceholderImage = (props: PlaceHolderProps) => {
  return <div style={props.style} className="placeholder-image"></div>;
};

export const Card = (props: Props) => {
  const imgEl = React.useRef<HTMLImageElement>(null);
  const loaded = useImageRender(imgEl);

  return (
    <div
      className="card absolute flex flex-col text-md sm:text-lg"
      style={props.style}
    >
      <PlaceholderImage
        style={!loaded ? { display: "block" } : { display: "none" }}
      />
      {props.src?.includes(".mp4") ? (
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          className="rounded-md"
          src={props.src}
          style={loaded ? { display: "inline-block" } : { display: "none" }}
        />
      ) : (
        <img
          style={loaded ? { display: "inline-block" } : { display: "none" }}
          className="rounded-md"
          src={props.src}
          ref={imgEl}
          alt=""
        />
      )}
      <div className="card-title ">
        <div>{props.title}</div>{" "}
      </div>
      <div className="card-score text-sm">Score {props.score}</div>
      <div className="card-rank flex justify-between text-sm">
        <div>Rank {props.rank}</div>
      </div>
      <div className="opensea-card  text-sm ">
        <a
          href={props.opensea}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Opensea
        </a>
      </div>
    </div>
  );
};
