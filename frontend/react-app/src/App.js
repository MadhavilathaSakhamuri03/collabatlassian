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
        
        <Header className="text-white text-[20px] text-center"        >
          JIRA, Bitbucket, JSM Dashboard
        </Header>
        
        <Layout>
          
          <Sider width={256} className="bg-[#f0f2f5]">
            <MenuItems setSelectedView={setSelectedView} />
          </Sider>

         
          <Layout className="p-[20px]" >
            <Content className="bg-white p-[20px] rounded-[10px]" >
              <AppRoutes /> 
            </Content>
          </Layout>
        </Layout>

        {/* Footer */}
        <Footer className="text-center"></Footer>
      </Layout>
    </Router>
  );
};

export default App;
