import React, { useState, useEffect } from 'react'
import { Breadcrumb, Table, Space, Button, Pagination, Tag, Popconfirm, message, Input } from 'antd';
import { list, deleteUser, modifyState, lists } from "../../../api/user";
import { cancel } from "../../../util/common";
import AgentDialog from '../../../components/agent/AgentDialog';

export default function AgentList() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    _id: 0,
    username: '',
    pwd: '',
    a_id: 0,
    dtype: 0,
    user_state: 0,
    phone: ''
  });
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
        let color = dtype === 1 ? 'gold' : 'geekblue';
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
          {record.dtype === 2 && <><Popconfirm
            title="确认停用该代理商？"
            onConfirm={() => editingStatus(record._id, record.user_state)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">{record.user_state === 1 ? '停用' : '启用'}</Button>
          </Popconfirm>
            <Popconfirm
              title="确认删除该代理商？"
              onConfirm={() => deleteU(record._id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">删除</Button>
            </Popconfirm></>}

        </Space>
      ),
    },
  ];
  const editingStatus = async (id, state) => {
    let new_state = state === 1 ? 2 : 1;
    let res = await modifyState({ id: id, state: new_state })
    if (res.status) {
      message.success(res.message);
      fetchData();
    } else {
      message.error(res.message);
    }
  }
  const deleteU = async (id) => {
    let res = await deleteUser({ id: id })
    if (res.status) {
      message.success(res.message);
      fetchData();
    } else {
      message.error(res.message);
    }
  }
  const handleShowModal = async (info) => {
    setSelected(info);
    setShowModal(true);
  }
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
    setCurrent(current);
  };
  const onChange = (current, pageSize) => {
    setPageSize(pageSize);
    setCurrent(current);
  };
  const onClick = (val) => {
    fetchData();
  }
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const fetchData = async () => {
    let res;
    if(value){
      res = await lists({
        pageSize: pageSize,
        current: current,
        username: value
      });
    }else{
      res = await list({
        pageSize: pageSize,
        current: current
      });
    }
    setTotal(res.pagination.total)
    setData(res.data);
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
            title: '校园代理管理',
          },
          {
            title: '校园代理列表',
          },
        ]}
      />
      <Input placeholder="请输入用户名" value={value} onChange={handleChange} style={{ marginTop: '20px', width: '250px' }} />
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
      <AgentDialog
        visible={showModal}
        onCancel={() => setShowModal(false)}
        selected={selected}
        onClick={onClick}
      />
    </div>
  )
}
