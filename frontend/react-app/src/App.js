import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import "./App.css"; // Global styles
import MenuItems from "./components/Menu";
import AppRoutes from "./AppRoute"

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [selectedView, setSelectedView] = useState("sprint");

  return (
    
    <Router>
      <Layout className="min-h-screen">
        
        <Header style={{ color: "white", fontSize: "20px", textAlign: "center" }}>
          JIRA, Bitbucket, JSM Dashboard
        </Header>
        
        <Layout>
          
          <Sider width={256} style={{ background: "#f0f2f5" }}>
            <MenuItems setSelectedView={setSelectedView} />
          </Sider>

         
          <Layout style={{ padding: "20px" }}>
            <Content style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
              <AppRoutes /> 
            </Content>
          </Layout>
        </Layout>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Router>
  );
};

export default App;
