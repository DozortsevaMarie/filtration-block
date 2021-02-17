import React from "react";
import style from "./DownloadBlock.module.css";
import { Button } from "antd";

const DownloadBlock = ({ children, handleClick, isFetching }) => {
  return (
    <div className={style.block}>
      {children}
      <Button type="primary" disabled={isFetching} onClick={handleClick}>
        Download
      </Button>
    </div>
  );
};

export default DownloadBlock;