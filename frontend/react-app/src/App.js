import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from './api/HomePage'; // Main dashboard page
import './App.css'; // Global styles

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Header */}
        <Header style={{ color: 'white', fontSize: '20px', textAlign: 'center' }}>
          JIRA, Bitbucket, JSM Dashboard
        </Header>

        {/* Main Content */}
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>
         
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
