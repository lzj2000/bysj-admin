import React from 'react'
import { Breadcrumb } from 'antd';

export default function AddressList() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '校园管理',
          },
          {
            title: '校园列表',
          },
        ]}
      />
      AddressList
    </div>
  )
}
