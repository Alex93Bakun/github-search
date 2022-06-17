import React, { FC } from "react";

import s from "../styles/SearchBar.module.scss";
import { ISearchBarProps } from "../types/searchBar";

const SearchBar: FC<ISearchBarProps> = ({ value, setValue, placeholder }) => {
  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => changeValueHandler(e)}
        className={s.searchbar}
        placeholder={placeholder}
      />
    </>
  );
};

export default SearchBar;
