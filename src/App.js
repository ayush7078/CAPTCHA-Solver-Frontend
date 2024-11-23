import React from "react";
import { Layout } from "antd";
import Captcha from "./components/Captcha";

const { Header, Content} = Layout;

const App = () => {
  
  return (
    <Layout>
      <Header style={{ background: "#1890ff", textAlign: "center" }}>
        <h3 style={{ color: "#fff", margin: 0, fontWeight : "bold" }}>CAPTCHA Solver App</h3>
      </Header>
      <Content style={{ padding: 10 }}>
        <Captcha />
      </Content>
    </Layout>
  );
};

export default App;
