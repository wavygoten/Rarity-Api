import React from "react";
import search from "../images/search.svg";
interface Props {
  placeholder?: string;
  className?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  loading: boolean;
}

export const Input = (props: Props) => {
  return (
    <div className="search-container flex mx-auto justify-center rounded-md">
      <input
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        autoComplete="off"
        className="p-2 duration-50 ease-linear sm:w-5/6 w-3/4"
      />
      <button
        onClick={props.onClick}
        className="search-btn flex justify-center items-center sm:w-1/6 w-1/4"
      >
        {props.loading ? (
          <div
            className="spinner-border animate-spin  w-4 h-4 border-2 rounded-full"
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
        ) : (
          <img src={search} alt="" />
        )}
      </button>
    </div>
  );
};
