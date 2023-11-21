import React, { useState, useEffect } from 'react';
import { Breadcrumb, Table, Avatar, Space, Input, Button, Tooltip, Pagination } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './list.scss';
import { getAllOrderReceiver } from "../../../api/wxuser";

export default function TakerList() {
  const { userinfo } = useSelector((store) => store.user);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '昵称',
      dataIndex: 'nick_name',
      key: 'nick_name',
    },
    {
      title: '头像',
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      render: (_, record) => (
        <Space size="middle">
          <Avatar src={record.avatar_url} />
        </Space>
      ),
    },
    {
      title: '总完成量',
      dataIndex: 'all',
      key: 'all',
    },
    {
      title: '本年完成量',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '本月完成量',
      dataIndex: 'month',
      key: 'month',
    },
  ];

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
    setCurrent(current);
  };

  const onChange = (current, pageSize) => {
    setPageSize(pageSize);
    setCurrent(current);
  };

  const fetchData = async () => {
    if (userinfo.school) {
      console.log(userinfo.school);
    } else {
      let res = await getAllOrderReceiver({
        pageSize: pageSize,
        current: current
      });
      setTotal(res.pagination.total)
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize,current]);

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '用户管理',
          },
          {
            title: '接单员列表',
          },
        ]}
      />
      <div style={{ marginTop: '20px' }} className="search">
        <Input placeholder="请输入姓名" prefix={<UserOutlined />} style={{
          width: '20%',
          marginRight: '5px'
        }} />
        <Tooltip title="搜索">
          <Button shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
        bordered
        size="middle"
        pagination={false}
        scroll={{
          x: 'calc(400px + 50%)',
          y: 400,
        }}
      />
      <Pagination style={{ marginTop: '20px' }}
        showSizeChanger
        pageSizeOptions={[3, 5, 8]}
        pageSize={pageSize}
        current={current}
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        defaultCurrent={1}
        total={total}
      />
    </div>
  );
}