import React from 'react'
import { Breadcrumb } from 'antd';

export default function Other() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '订单管理',
          },
          {
            title: '其他服务',
          },
        ]}
      />
    </div>
  )
}
