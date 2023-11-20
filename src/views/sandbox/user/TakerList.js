import React from 'react'
import { Breadcrumb } from 'antd';

export default function TakerList() {
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
    </div>
  )
}
