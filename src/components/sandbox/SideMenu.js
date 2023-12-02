import React from 'react';
import './index.css';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { UserOutlined, ShoppingOutlined, TransactionOutlined, ToolOutlined, ContactsOutlined, AppstoreAddOutlined, CalendarOutlined, ScheduleOutlined, SmileOutlined, SolutionOutlined, AlertOutlined, BankOutlined, HomeOutlined, TeamOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';

const { Sider } = Layout;

//模拟数组结构
const menuList = [
  {
    key: "/home",
    label: "首页",
    icon: <HomeOutlined />
  },
  {
    key: "/agent",
    label: "校园代理管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/agent/agentlist",
        label: "校园代理列表",
        icon: <UserSwitchOutlined />
      },
      {
        key: "/agent/addagent",
        label: "新增校园代理人",
        icon: <UserAddOutlined />
      }
    ]
  },
  {
    key: "/address",
    label: "校园管理",
    icon: <BankOutlined />,
    children: [
      {
        key: "/address/addresslist",
        label: "校园列表",
        icon: <CalendarOutlined />
      },
      {
        key: "/address/addaddress",
        label: "新增校园",
        icon: <AppstoreAddOutlined />
      }
    ]
  },
  {
    key: "/user",
    label: "用户管理",
    icon: <TeamOutlined />,
    children: [
      {
        key: "/user/userlist",
        label: "用户列表",
        icon: <SmileOutlined />
      },
      {
        key: "/user/takerlist",
        label: "接单员列表",
        icon: <ScheduleOutlined />
      },
      {
        key: "/user/istaker",
        label: "审核",
        icon: <SolutionOutlined />
      }
    ]
  },
  {
    key: "/order",
    label: "订单管理",
    icon: <AlertOutlined />,
    children: [
      {
        key: "/order/delivery",
        label: "快递代取",
        icon: <ContactsOutlined />
      },
      {
        key: "/order/errand",
        label: "校园跑腿",
        icon: <TransactionOutlined />
      },
      {
        key: "/order/repair",
        label: "上门维修",
        icon: <ToolOutlined />
      },
      {
        key: "/order/other",
        label: "其他服务",
        icon: <ShoppingOutlined />
      }
    ]
  }
];

const menuLista = [
  {
    key: "/home",
    label: "首页",
    icon: <HomeOutlined />
  },
  {
    key: "/user",
    label: "用户管理",
    icon: <TeamOutlined />,
    children: [
      {
        key: "/user/userlist",
        label: "用户列表",
        icon: <SmileOutlined />
      },
      {
        key: "/user/takerlist",
        label: "接单员列表",
        icon: <ScheduleOutlined />
      },
      {
        key: "/user/istaker",
        label: "审核",
        icon: <SolutionOutlined />
      }
    ]
  },
  {
    key: "/order",
    label: "订单管理",
    icon: <AlertOutlined />,
    children: [
      {
        key: "/order/delivery",
        label: "快递代取",
        icon: <ContactsOutlined />
      },
      {
        key: "/order/errand",
        label: "校园跑腿",
        icon: <TransactionOutlined />
      },
      {
        key: "/order/repair",
        label: "上门维修",
        icon: <ToolOutlined />
      },
      {
        key: "/order/other",
        label: "其他服务",
        icon: <ShoppingOutlined />
      }
    ]
  }
];

const searchUrlKey = (key, menu) => {
  let arrObj = [];

  const demoFn = (_arr) => {
    _arr.forEach(n => {
      if (key.includes(n.key)) {
        arrObj.push(n.key);
        if (n.children) {
          demoFn(n.children);
        }
      }
    });
  };

  demoFn(menu);
  return arrObj;
};

export default function SideMenu(props) {
  const { userinfo } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collapsed } = props;
  let pathKey = searchUrlKey(pathname, userinfo.dtype === 1 ? menuList : menuLista);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={200} style={{ background: '#fff', overflow: 'auto', height: '100vh' }}>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={pathKey}
        onClick={(e) => {
          navigate(e.key);
        }}
        items={userinfo.dtype === 1 ? menuList : menuLista}
      />
    </Sider>
  );
}