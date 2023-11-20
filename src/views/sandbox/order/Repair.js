import React from 'react'
import { Breadcrumb } from 'antd';

export default function Repair() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '订单管理',
          },
          {
            title: '上门维修',
          },
        ]}
      />
    </div>
  )
}
