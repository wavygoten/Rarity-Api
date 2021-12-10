import React from "react";
import search from "../images/search.svg";
interface Props {
  placeholder?: string;
  className?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchTokens = (props: Props) => {
  return (
    <div className="search-match flex items-center">
      <div>
        <img src={search} alt="" />
      </div>
      <input
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        autoComplete="off"
        className="p-2 duration-50 ease-linear flex-1 ml-3"
      />
    </div>
  );
};

export default SearchTokens;
