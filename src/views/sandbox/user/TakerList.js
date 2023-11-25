import React, { useState, useEffect } from 'react';
import { Breadcrumb, Table, Avatar, Space, Button } from 'antd';
import { useSelector } from 'react-redux';
import './list.scss';
import { getAllOrderReceiver, getOrderQuantity, getSchoolOrderQuantity } from "../../../api/wxuser";
import TakerDialog from '../../../components/wxuser/TakerDialog';


export default function TakerList() {
  const { userinfo } = useSelector((store) => store.user);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    all: '',
    year: '',
    month: ''
  });
  const [pageSize, setPageSize] = useState(8);
  const [current, setCurrent] = useState(1);
  const pagination = {
    pageSize: pageSize,// 默认每页显示条数
    defaultCurrent: current,// 默认当前页数
    pageSizeOptions: [3, 5, 8],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      setPageSize(pageSize);
      setCurrent(current);
    },
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      filters: data.map(item => ({ text: item.name, value: item.name })),
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
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
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleShowModal(record)}>
            查看数据
          </Button>
        </Space>
      ),
    },
  ];
  const handleShowModal = async (info) => {
    if (userinfo.school) {
      setShowModal(true);
      let res = await getSchoolOrderQuantity({user_id:info.id,school:userinfo.school});
      setSelected(res.data)
    } else {
      setShowModal(true);
      let res = await getOrderQuantity({user_id:info.id});
      setSelected(res.data)
    }
  }

  const fetchData = async () => {
    let res = await getAllOrderReceiver();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey='id'
        bordered
        scroll={{
          x: 'calc(400px + 50%)',
          y: 400,
        }}
      />
      <TakerDialog
        visible={showModal}
        onCancel={() => setShowModal(false)}
        selected={selected}
      />
    </div>
  );
}