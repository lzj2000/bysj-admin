import React, { useEffect, useRef } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { modifyingInformation } from '../../api/user'
import './AgentDialog.scss'

export default function AgentDialog({ visible, onCancel, selected, onClick }) {
    const FormRef = useRef(null)
    const handleOk = async () => {
        let info = FormRef.current.getFieldsValue();
        info.id = selected._id
        let res = await modifyingInformation(info)
        if(res.status){
            message.success(res.message);
            onClick()
            onCancel()
        }else{
            message.error(res.message);
        }
    }
    useEffect(() => {
        FormRef && FormRef.current && FormRef.current.setFieldsValue(selected);
    }, [selected])
    return (
        <>
            <Modal
                title="审核"
                open={visible}
                width={600}
                onOk={handleOk}
                onCancel={onCancel}
            >
                <div className='mains'>
                    <Form
                        name="basic"
                        ref={FormRef}
                        initialValues={selected}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        style={{
                            maxWidth: 500,
                        }}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            label="手机号"
                            name="phone"
                            rules={[
                                { required: true, message: '请输入手机号!', },
                                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号!' }
                            ]}
                        >
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
                            <Input />
                        </Form.Item>
                        {selected.dtype === 2 && <Form.Item
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
                        </Form.Item>}
                    </Form>
                </div>
            </Modal>
        </>
    )
}
