import React from "react";
import { Button, Input } from "antd";
import style from "./Serch.module.css";

const Search = ({ value, setValue, handleSearchClick }) => {
  return (
    <div className={style.search}>
      <Input
        placeholder="Find an item"
        onChange={(e) => setValue(e.currentTarget.value)}
        value={value}
        onPressEnter={handleSearchClick}
      />
      <Button type="primary"
              onClick={handleSearchClick}>
        Search
      </Button>
    </div>
  );
};

export default Search;
