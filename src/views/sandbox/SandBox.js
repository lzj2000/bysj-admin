import React, { useState } from 'react';
import './SandBox.css'
import { Outlet } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Layout, theme } from 'antd';
const { Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const change = () => {
    setCollapsed(!collapsed)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <SideMenu collapsed={collapsed}></SideMenu>
      <Layout style={{ overflow: 'auto', height: '100vh' }}>
        <TopHeader collapsed={collapsed} change={change}></TopHeader>
        <Content
          style={{
            overflow: 'auto', height: '100vh',
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;