import React from 'react';
import './index.css'
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import {
  UserOutlined
} from '@ant-design/icons';
const { Sider } = Layout;

//模拟数组结构
const menuList = [
  {
    key: "/home",
    label: "首页",
    icon: <UserOutlined />
  },
  {
    key: "/agent",
    label: "校园代理管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/agent/agentlist",
        label: "校园代理列表",
        icon: <UserOutlined />
      },
      {
        key: "/agent/addagent",
        label: "新增校园代理人",
        icon: <UserOutlined />
      }
    ]
  },
  {
    key: "/address",
    label: "校园管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/address/addresslist",
        label: "校园列表",
        icon: <UserOutlined />
      },
      {
        key: "/address/addaddress",
        label: "新增校园",
        icon: <UserOutlined />
      }
    ]
  },
  {
    key: "/user",
    label: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user/userlist",
        label: "用户列表",
        icon: <UserOutlined />
      },
      {
        key: "/user/takerlist",
        label: "接单员列表",
        icon: <UserOutlined />
      },
      {
        key: "/user/istaker",
        label: "审核",
        icon: <UserOutlined />
      }
    ]
  },
  {
    key: "/order",
    label: "订单管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/order/order",
        label: "订单列表",
        icon: <UserOutlined />
      }
    ]
  }
]

export default function SideMenu(props) {
  const navigate = useNavigate();
  let { collapsed } = props
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" >校园服务平台管理系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={(e) => {
          navigate(e.key)
        }}
        items={menuList}
      />
    </Sider>
  )
}
