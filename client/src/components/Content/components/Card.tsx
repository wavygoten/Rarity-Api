import React from "react";
import { useImageRender } from "../../../hooks/useImageRender";

interface PlaceHolderProps {
  style: React.CSSProperties;
}
type Props = {
  src: string;
  title: string;
  score: number;
  rank: string;
  opensea: string;
  details?: any;
  style: React.CSSProperties;
};
const PlaceholderImage = ({ style }: PlaceHolderProps) => {
  return <div style={style} className="placeholder-image"></div>;
};

const Card = ({
  src,
  title,
  score,
  rank,
  opensea,
  details,
  style,
  ...args
}: Props) => {
  const imgEl = React.useRef<HTMLImageElement>(null);
  const loaded = useImageRender(imgEl);
  return <div>Card</div>;
};

export default Card;
