import React, { useCallback } from 'react'
import { Form, Button, Input, message } from 'antd'
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { getUser } from '../../api/user'
import { useDispatch} from 'react-redux';
import { getUserInfo } from "../../store/features/user";

import './Login.css'

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    const res = await getUser(values);
    if (res.status) {
      if (res.data.user_state === 1) {
        messageApi.open({
          type: 'success',
          content: '登录成功',
        });
        dispatch(getUserInfo({value: res.data}))
        navigate('/')
      } else {
        messageApi.open({
          type: 'error',
          content: '该账号已停用',
        });
      }
    } else {
      messageApi.open({
        type: 'error',
        content: res.message,
      });
    }
  }
  const particlesInit = useCallback(async engine => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);


  return (
    <div style={{ background: 'rgb(35, 39, 65)', height: "100%", overflow: 'hidden' }}>
      {contextHolder}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="formContainer">
        <div className="logintitle">校园服务平台管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item className='btn'>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
