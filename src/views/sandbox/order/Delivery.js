import React from 'react'
import { Breadcrumb } from 'antd';

export default function Delivery() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '订单管理',
          },
          {
            title: '快递代取',
          },
        ]}
      />
    </div>
  )
}
