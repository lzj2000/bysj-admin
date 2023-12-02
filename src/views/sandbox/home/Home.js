import React from 'react'
import { Breadcrumb } from 'antd';
import Cards from './cards/Cards';
import Sale from './sale/Sale';

export default function Home() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '校园服务平台管理系统',
          },
          {
            title: '首页',
          },
        ]}
      />
      <div style={{ marginTop: "10px" }}>
        <Cards />
        <Sale />
      </div>
    </div>
  )
}
