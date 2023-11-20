import React, { useRef } from 'react';
import { Button, Form, Input, message, Breadcrumb } from 'antd';
import './AddAddress.scss'
import { addArea } from '../../../api/area'

export default function AddAddress() {
  const [messageApi, contextHolder] = message.useMessage();
  const addform = useRef();
  const onFinish = async (values) => {
    let res = await addArea(values)
    if (res.status) {
      messageApi.open({
        type: 'success',
        content: res.message,
      });
      addform.current.resetFields()
    } else {
      messageApi.open({
        type: 'error',
        content: res.message,
      });
    }
  };
  return (
    <div className='box'>
      <Breadcrumb
        items={[
          {
            title: '校园管理',
          },
          {
            title: '新增校园',
          },
        ]}
      />
      <div className='address_box'>
        {contextHolder}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            minWidth: 600
          }}
          ref={addform}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="序号"
            name="a_id"
            rules={[
              {
                required: true,
                message: '请输入正确序号!',
                pattern: /^\d+$/, // 只能输入数字的正则表达式
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="学校"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入正确学校！',
                pattern: /^[\u4e00-\u9fa5]+(大学|学院)$/,
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 14,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  )
}
