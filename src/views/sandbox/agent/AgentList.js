import React, { useState, useEffect } from 'react'
import { Breadcrumb, Table, Space, Button, Pagination, Tag } from 'antd';
import { list } from "../../../api/user";

export default function AgentList() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const columns = [
    {
      title: '用户名',
      width: 180,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 180,
      key: 'phone',
    },
    {
      title: '权限',
      dataIndex: 'dtype',
      key: 'dtype',
      width: 180,
      render: (_, { dtype }) => {
        let color = dtype === 1 ? 'green' : 'geekblue';
        let text = dtype === 1 ? '管理员' : '校园代理';
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },

    {
      title: '代理学校',
      dataIndex: 'school',
      key: 'school',
      render: (_, record) => (
        <Space size="middle">
          {record.school ? record.school : '无'}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'user_state',
      key: 'user_state',
      width: 180,
      render: (_, { user_state }) => {
        let color = user_state === 1 ? 'green' : 'volcano';
        let text = user_state === 1 ? '可用' : '停用';
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleShowModal(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleShowModal(record)}>
            停用
          </Button>
          <Button type="link" onClick={() => handleShowModal(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const handleShowModal = async (info) => {
    console.log(555);
  }
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
    setCurrent(current);
  };
  const onChange = (current, pageSize) => {
    setPageSize(pageSize);
    setCurrent(current);
  };
  const fetchData = async () => {
    let res = await list({
      pageSize: pageSize,
      current: current
    });
    setTotal(res.pagination.total)
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, current]);
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '校园代理管理',
          },
          {
            title: '校园代理列表',
          },
        ]}
      />
      <Table
        style={{ height: '450px', marginTop: '20px' }}
        columns={columns}
        dataSource={data}
        rowKey='a_id'
        bordered
        pagination={false}
        scroll={{
          x: 'calc(400px + 50%)',
          y: 'calc(450px - 50px)',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          style={{ marginTop: '20px' }}
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
    </div>
  )
}
