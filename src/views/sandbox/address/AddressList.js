import React, { useState, useEffect } from 'react'
import { Breadcrumb, Table, Space, Button, Pagination, Popconfirm, message, Input } from 'antd';
import { list, deleteArea, lists, getOrderQuantity } from "../../../api/area";
import { parseTime, sortByField, cancel } from "../../../util/common";
import AddressDialog from '../../../components/address/AddressDialog';


export default function AddressList() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    all: '',
    year: '',
    month: ''
  });
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
          <Popconfirm
            title="确认删除该地址？"
            onConfirm={() => deleteA(record.a_id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleShowModal = async (info) => {
    setShowModal(true);
    let res = await getOrderQuantity({ school: info.name });
    setSelected(res.data)
  }
  const deleteA = async (id) => {
    let res = await deleteArea({ id: id })
    console.log(res);
    if (res.status) {
      message.success(res.message);
      fetchData();
    } else {
      message.error(res.message);
    }
  }
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
    setCurrent(current);
  };
  const onChange = (current, pageSize) => {
    setPageSize(pageSize);
    setCurrent(current);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const fetchData = async () => {
    let res;
    if (value) {
      res = await lists({
        pageSize: pageSize,
        current: current,
        username: value
      });
    } else {
      res = await list({
        pageSize: pageSize,
        current: current
      });
    }
    setTotal(res.pagination.total)
    setData(sortByField(res.data, 'a_id'));
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, current, value]);
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
      <Input placeholder="请输入学校" value={value} onChange={handleChange} style={{ marginTop: '20px', width: '250px' }} />
      <Table
        style={{ height: '450px', marginTop: '10px' }}
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
      <AddressDialog
        visible={showModal}
        onCancel={() => setShowModal(false)}
        selected={selected}
      />
    </div>
  )
}
