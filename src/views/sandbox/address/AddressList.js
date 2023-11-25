import React, { useState, useEffect } from 'react'
import { Breadcrumb, Table, Space, Button, Pagination } from 'antd';
import { list } from "../../../api/area";
import { parseTime, sortByField } from "../../../util/common";

export default function AddressList() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const columns = [
    {
      title: '序号',
      dataIndex: 'a_id',
      key: 'a_id',
    },
    {
      title: '学校',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '代理人',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => (
        <Space size="middle">
          {record.user ? record.user : '无'}
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (_, record) => (
        <Space size="middle">
          {parseTime(record.create_time, '{y}-{m}-{d}')}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleShowModal(record)}>
            查看数据
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
    setData(sortByField(res.data, 'a_id'));
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
            title: '校园管理',
          },
          {
            title: '校园列表',
          },
        ]}
      />
      <Table
        style={{ height: '450px',marginTop: '20px' }}
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
