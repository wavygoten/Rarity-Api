import React from "react";

interface Props {
  src: string;
  title: string;
  score: number;
  rank: string;
  opensea: string;
  details?: any;
  style: React.CSSProperties;
}

export const Card = (props: Props) => {
  return (
    <div
      className="card absolute flex flex-col text-md sm:text-lg"
      style={props.style}
    >
      {props.src.includes(".mp4") ? (
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          className="rounded-md"
          src={props.src}
        />
      ) : (
        <img className="rounded-md" src={props.src} alt="" />
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
