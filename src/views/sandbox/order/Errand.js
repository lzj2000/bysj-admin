import React, { useState, useEffect } from 'react'
import { Breadcrumb, Table, Pagination, Space, Tag, Button, Popconfirm, message } from 'antd';
import Search from '../../../components/search/Search';
import { getErrand, deleteErrand, cancelErrand, getErrands } from '../../../api/order'
import { parseTime, cancel } from "../../../util/common";
import { useSelector } from 'react-redux';
import ErrandDialog from '../../../components/order/ErrandDialog';

export default function Errand() {
  const { userinfo } = useSelector((store) => store.user);
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [school, setSchool] = useState(null);
  const [pageSize, setPageSize] = useState(8);
  const [current, setCurrent] = useState(1);
  const [info, setInfo] = useState({
    complete_time: undefined,
    created_time: undefined,
    name: undefined,
    school: undefined,
    receiver_name: undefined,
    type: undefined
  });
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = async (info) => {
    let res = await getErrands({id:info.id})
    setSelected(res[0]);
    setShowModal(true);
  }
  const columns = [
    {
      title: '用户姓名',
      width: 120,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户电话',
      width: 150,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'type',
      width: 120,
      key: 'type',
      render: (_, { type }) => {
        let color = type === 0 ? 'gold' : 'blue';
        if (type === 2) { color = 'green'; }
        let text = type === 1 ? '接单中' : '待接单';
        if (type === 2) { text = '已完成'; }
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: '接单人昵称',
      width: 120,
      dataIndex: 'receiver_name',
      key: 'receiver_name',
    },
    {
      title: '接单人电话',
      width: 150,
      dataIndex: 'receiver_phone',
      key: 'receiver_phone',
    },
    {
      title: '学校',
      width: 120,
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: '订单发起时间',
      dataIndex: 'created_time',
      width: 150,
      key: 'created_time',
      render: (_, record) => (
        <Space size="middle">
          {parseTime(record.created_time, '{y}-{m}-{d}')}
        </Space>
      ),
    },
    {
      title: '订单完成时间',
      dataIndex: 'complete_time',
      width: 150,
      key: 'complete_time',
      render: (_, record) => (
        <Space size="middle">
          {record.complete_time ? parseTime(record.complete_time, '{y}-{m}-{d}') : "未完成"}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 260,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleShowModal(record)}>
            查看
          </Button>
          <Popconfirm
            title="确认删除该订单？"
            onConfirm={() => deleteO(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
          {record.type === 1 &&
            <Popconfirm
              title="确认取消该订单？"
              onConfirm={() => cancelOrder(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">取消接单</Button>
            </Popconfirm>
          }

        </Space>
      ),
    },
  ];
  const deleteO = async (info) => {
    let res = await deleteErrand({ id: info.id,img_id: info.img_id })
    if (res.status) {
      message.success(res.message);
      fetchData();
    } else {
      message.error(res.message);
    }
  }
  const cancelOrder = async (id) => {
    let res = await cancelErrand({ id: id })
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
  const getChildCount = (val) => {
    setInfo(val);
  };
  const fetchData = async () => {
    if (userinfo.school) { 
      let data = { ...info, pageSize, current };
      let res = await getErrand(data)
      setTotal(res.pagination.total)
      setData(res.data);
    } else {
      let data = { ...info, pageSize, current };
      let res = await getErrand(data)
      setTotal(res.pagination.total)
      setData(res.data);
    }
  };
  useEffect(() => {
    if (userinfo.school) { 
      setIsDisabled(true);
      setSchool(userinfo.school)
      setInfo(prevInfo => ({ ...prevInfo, school: userinfo.school }));
    } else {
      setIsDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, pageSize, current]);

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '订单管理',
          },
          {
            title: '校园跑腿',
          },
        ]}
      />
      <Search style={{ marginTop: '20px' }} onClick={getChildCount} isDisabled={isDisabled} school={school} />
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={data}
        rowKey='id'
        bordered
        pagination={false}
        scroll={{
          x: 1400,
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
      <ErrandDialog
        visible={showModal}
        onCancel={() => setShowModal(false)}
        selected={selected}
      />
    </div>
  )
}
