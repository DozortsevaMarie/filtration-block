import React, { useState } from "react";
import "./App.module.css";
import { Layout } from "antd";
import DownloadBlock from "./components/DownloadBlock/DownloadBlock";
import { getBigDataThunk, getSmallDataThunk } from "./reducers/info-reducer";
import { connect } from "react-redux";
import MainPage from "./components/mainPage";
import style from "./App.module.css";

const { Header, Sider, Content } = Layout;

function App({ getSmallDataThunk, getBigDataThunk }) {
  const [isFetching, setIsFetching] = useState(false);

  const handleClickSmallData = () => {
    setIsFetching(true);
    getSmallDataThunk();
  };
  const handleClickBigData = () => {
    setIsFetching(true);
    getBigDataThunk();
  };

  return (
    <Layout className={style.wrapper}>
      <Sider className={style.sidebar}>
        <DownloadBlock
          isFetching={isFetching}
          handleClick={handleClickSmallData}
        >
          <h3>Small data list</h3>
        </DownloadBlock>
        <DownloadBlock isFetching={isFetching} handleClick={handleClickBigData}>
          <h3>Big data list</h3>
        </DownloadBlock>
      </Sider>
      <Layout>
        <Header className={style.header}>
          <h1>Filtration Block App</h1>
        </Header>
        <Content className={style.content}>
          <MainPage isFetching={isFetching} setIsFetching={setIsFetching} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default connect(() => ({}), {
  getSmallDataThunk,
  getBigDataThunk,
})(App);
