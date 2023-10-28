import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Layout, Button, theme, Dropdown, Avatar } from 'antd';
const { Header } = Layout;
const items = [
  {
    key: '1',
    label: '超级管理员',
  },
  {
    key: '2',
    danger: true,
    label: '退出',
  },
];
export default function TopHeader(props) {
  const navigate = useNavigate();
  let { collapsed, change } = props
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = ({ key }) => {
    if(key === '2'){
      localStorage.removeItem("token")
      navigate('/login')
    }
  };
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={change.bind()}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div style={{ float: "right" }}>
        <span style={{ marginRight: "15px"}}>欢迎admin回来!</span>
        <Dropdown
          menu={{
            items,
            onClick,
          }}
        >
          <Avatar style={{ marginRight: "15px"}} size="large" icon={<UserOutlined />} onClick={(e) => e.preventDefault()} />
        </Dropdown>
      </div>
    </Header>
  )
}
