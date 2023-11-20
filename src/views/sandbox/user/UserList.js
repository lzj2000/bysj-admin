import React from 'react'
import { Breadcrumb } from 'antd';

export default function UserList() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '用户管理',
          },
          {
            title: '用户列表',
          },
        ]}
      />
    </div>
  )
}
