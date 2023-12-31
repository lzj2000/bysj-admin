import React, { useState, useEffect } from 'react';
import { Breadcrumb, Table, Space, Tag, Button } from 'antd';
import { examine } from "../../../api/wxuser";
import ExamineDialog from '../../../components/wxuser/ExamineDialog';



export default function IsTaker() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    user_id: '',
    user_img: '',
    name: '',
    info: '',
    state: '',
    auditor: ''
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
      title: '备注',
      dataIndex: 'info',
      key: 'info',
      width: 500,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (_, { state }) => {
        let color = state === 0 ? 'geekblue' : 'green';
        if (state === 2) { color = 'volcano'; }
        let text = state === 1 ? '成功' : '待审批';
        if (state === 2) { text = '失败'; }
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
      filters: [
        {
          text: '待审核',
          value: '0',
        },
        {
          text: '成功',
          value: '1',
        },
        {
          text: '失败',
          value: '2',
        },
      ],
      onFilter: (value, record) => record.state === parseInt(value),
      filterSearch: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleShowModal(record)}>审核</Button>
        </Space>
      ),
    },
  ];
  const handleShowModal = (info) => {
    setSelected(info);
    setShowModal(true);
  }
  const fetchData = async () => {
    const result = await examine();
    setData(result.data);
  }
  const onClick = (val) => {
    fetchData();
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '用户管理',
          },
          {
            title: '审核',
          },
        ]}
      />
      <Table style={{ marginTop: '20px' }} columns={columns} dataSource={data} rowKey='id' bordered
        pagination={pagination}
        scroll={{
          x: 'calc(400px + 50%)',
          y: 400,
        }} />
      <ExamineDialog
        visible={showModal}
        onCancel={() => setShowModal(false)}
        selected={selected}
        onClick={onClick}
      />
    </div>
  )
}
