import React from "react";
import search from "../images/search.svg";
interface Props {
  placeholder?: string;
  className?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Input = (props: Props) => {
  return (
    <div className="search-container flex mx-auto justify-center rounded-md">
      <input
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        autoComplete="off"
        className="p-2 duration-50 ease-linear w-5/6"
      />
      <button
        onClick={props.onClick}
        className="search-btn flex justify-center items-center w-1/6"
      >
        <img src={search} alt="" />
      </button>
    </div>
  );
};

export default Input;
