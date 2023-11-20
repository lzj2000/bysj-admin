import React from 'react';
import './index.css'
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
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
        key: "/order/delivery",
        label: "快递代取",
        icon: <UserOutlined />
      },
      {
        key: "/order/errand",
        label: "校园跑腿",
        icon: <UserOutlined />
      },
      {
        key: "/order/repair",
        label: "上门维修",
        icon: <UserOutlined />
      },
      {
        key: "/order/other",
        label: "其他服务",
        icon: <UserOutlined />
      }
    ]
  }
]

const searchUrlKey = (key) => {
  let arrObj = []

  const demoFn = (_arr) => {
    _arr.forEach(n => {
      if (key.includes(n.key)) {
        arrObj.push(n.key)
        if (n.children) {
          demoFn(n.children)
        }
      }
    })
  }
  demoFn(menuList)
  return arrObj
}

export default function SideMenu(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  let { collapsed } = props
  let pathKey = searchUrlKey(pathname)
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}  width={200} style={{ background: '#fff', overflow: 'auto', height: '100vh'}}>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={pathKey}
        onClick={(e) => {
          navigate(e.key)
        }}
        items={menuList}
      />
    </Sider>
  )
}
