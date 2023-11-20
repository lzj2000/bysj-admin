import React from 'react'
import { Breadcrumb } from 'antd';

export default function Errand() {
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
    </div>
  )
}
