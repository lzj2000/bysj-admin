import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Layout, Button, Dropdown } from 'antd';
import { useSelector, useDispatch} from 'react-redux';
import { removeUserInfo } from "../../store/features/user";

const { Header } = Layout;
const items = [
  {
    key: '1',
    label: '返回首页',
  },
  {
    key: '2',
    danger: true,
    label: '退出',
  },
];

export default function TopHeader(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userinfo } = useSelector((store)=>store.user)
  let { collapsed, change } = props
  const onClick = ({ key }) => {
    if(key === '2'){
      localStorage.removeItem("token")
      dispatch(removeUserInfo())
      navigate('/login')
    }
  };
  return (
    <Header
      style={{
        padding: 0,
        color:'#fff'
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={change.bind()}
        style={{
          fontSize: '18px',
          width: 64,
          height: 64,
          color:'#fff'
        }}
      />
      校园服务平台管理系统
      <div style={{ float: "right" }}>
        <Dropdown
          menu={{
            items,
            onClick,
          }}
        >
          <span style={{ marginRight: "15px"}} onClick={(e) => e.preventDefault()}>欢迎{userinfo.username}回来 !</span>
        </Dropdown>
      </div>
    </Header>
  )
}
