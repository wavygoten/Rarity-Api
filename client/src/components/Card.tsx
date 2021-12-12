import React from "react";

interface Props {
	src: string;
	title: string;
	score: number;
	rank: string;
	opensea: string;
	details?: any;
}

const Card = (props: Props) => {
	return (
		<div className="card flex flex-col flex-nowrap text-left text-md sm:text-lg break-words sm:m-2">
			<img className="rounded-md" src={props.src} alt="" />
			<div className="card-title text-md sm:text-lg">
				<div>{props.title}</div>{" "}
			</div>
			<div className="card-score text-sm">Score {props.score}</div>
			<div className="card-rank flex justify-between text-sm">
				<div>Rank {props.rank}</div>
			</div>
			<div className="opensea-card text-sm">
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

export default Card;
