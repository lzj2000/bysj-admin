import React from 'react'
import { Breadcrumb } from 'antd';

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
      9995
    </div>
  )
}
