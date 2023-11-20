import React from 'react'
import { Breadcrumb } from 'antd';

export default function AgentList() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: '校园代理管理',
          },
          {
            title: '校园代理列表',
          },
        ]}
      />
    </div>
  )
}
