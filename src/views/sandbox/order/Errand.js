import React, { useState, useEffect } from 'react'
import { Breadcrumb, Table, Pagination  } from 'antd';
import Search from '../../../components/search/Search';
import { getErrand } from '../../../api/order'

export default function Errand() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [current, setCurrent] = useState(1);
  const [info, setInfo] = useState({
    complete_time: undefined,
    created_time: undefined,
    name: undefined,
    phone: undefined,
    receiver_name: undefined,
    type: undefined
  });
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
  ];
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
    let data = { ...info, pageSize, current };
    let res = await getErrand(data)
    setTotal(res.pagination.total)
    setData(res.data);
  };
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
      <Search style={{ marginTop: '20px' }} onClick={getChildCount} />
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
