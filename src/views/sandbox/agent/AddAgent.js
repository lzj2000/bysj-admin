import React, { useRef } from 'react';
import { Button, Form, Input, message, Breadcrumb } from 'antd';
import { add } from "../../../api/user";
import './AddAgent.scss'

export default function AddAgent() {
  const [messageApi, contextHolder] = message.useMessage();
  const addform = useRef();
  const onFinish = async (values) => {
    if (values.pwd !== values.pwds) {
      messageApi.open({
        type: 'error',
        content: '两次密码不一样',
      });
      return
    }
    let res = await add(values)
    if(res.status){
      messageApi.open({
        type: 'success',
        content: res.message,
      });
      addform.current.resetFields();
    }else{
      message.error(res.message);
    }
    
  };
  return (
    <div className='box'>
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
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号!', },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号!' }
            ]} >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="pwd"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="pwds"
            rules={[
              {
                required: true,
                message: '请输入确认密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="学校序号"
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
