import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Table from "../Table/Table";
import Search from "../Search/Search";
import FormBase from "../Form/Form";
import { connect } from "react-redux";
import {
  addNewItem,
  setCurrentPage,
  setTotalItemsCount,
} from "../../reducers/info-reducer";

const MainPage = ({
  items,
  isFetching,
  setIsFetching,
  totalItemsCount,
  currentPage,
  setCurrentPage,
  pageSize,
  addNewItem,
  setTotalItemsCount,
}) => {
  const [tableData, setTableData] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    setTableData(items);
    setIsFetching(false);
  }, [items]);

  const handleSearchClick = () => {
    if (value === "") {
      setTableData(items);
      setTotalItemsCount(items.length);
    } else {
      const newTData = items.filter(
        (item) =>
          Object.values(item).toString().toLowerCase().includes(value) ||
          Object.values(item.address).some((address) =>
            address.toLowerCase().includes(value)
          )
      );
      setTableData(newTData);
      setTotalItemsCount(newTData.length);
    }
  };

  return (
    <>
      {isFetching ? (
        <Spin size="large" />
      ) : (
        <>
          <Search
            value={value}
            setValue={setValue}
            handleSearchClick={handleSearchClick}
          />
          <Table
            data={tableData}
            currentPage={currentPage}
            totalItemsCount={totalItemsCount}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
          />
          <FormBase addNewItem={addNewItem} />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  items: state.infoReducer.items,
  pageSize: state.infoReducer.pageSize,
  totalItemsCount: state.infoReducer.totalItemsCount,
  currentPage: state.infoReducer.currentPage,
});

export default connect(mapStateToProps, {
  setCurrentPage,
  addNewItem,
  setTotalItemsCount,
})(MainPage);
