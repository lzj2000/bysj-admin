import React, { useState, useEffect } from 'react'
import { Breadcrumb, Table, Avatar, Space, Pagination } from 'antd';
import { getWxuser } from "../../../api/wxuser";


export default function UserList() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const columns = [
    {
      title: '昵称',
      dataIndex: 'nick_name',
      key: 'nick_name',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
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
    }
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
    let res = await getWxuser({
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
            title: '用户管理',
          },
          {
            title: '用户列表',
          },
        ]}
      />
      <Table
        style={{ height: '450px',marginTop: '20px' }}
        columns={columns}
        dataSource={data}
        rowKey='id'
        bordered
        pagination={false}
        scroll={{
          x: 'calc(400px + 50%)',
          y: 'calc(450px - 50px)',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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

    </div>
  )
}
