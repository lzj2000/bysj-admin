import React, { useEffect, useRef } from 'react';
import { Modal, Button, Image, Form, Input, message, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
import { byApplication, notApproved } from "../../api/wxuser";
import './ExamineDialog.scss'

export default function ExamineDialog({ visible, onCancel, selected, onClick }) {
    const FormRef = useRef(null)
    const { userinfo } = useSelector((store) => store.user)
    useEffect(() => {
        FormRef && FormRef.current && FormRef.current.setFieldsValue(selected);
    }, [selected])

    const handleClick = async () => {
        const result = await byApplication({username:userinfo.username,id:selected.user_id});
        if(result.status){
            message.success(result.message);
            onClick()
            onCancel()
        }else{
            message.error(result.message);
        }
    }
    const handleClicks = async () => {
        const result = await notApproved({username:userinfo.username,id:selected.user_id});
        if(result.status){
            message.success(result.message);
            onClick()
        }else{
            message.error(result.message);
        }
    }
    const cancel = (e) => {
        console.log(e);
    };
    // 根据 selected.state 的不同值生成不同的按钮
    let footerButtons = [];
    if (selected.state === 0) {
        footerButtons = [
            <Popconfirm
                title="确认通过该申请"
                onConfirm={handleClick}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                key="ok"
            >
                <Button>通过</Button>
            </Popconfirm>,
            <Popconfirm
                title="确认不通过该申请"
                onConfirm={handleClicks}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                key="no"
            >
                <Button danger>不通过</Button>
            </Popconfirm>,
        ];
    } else if (selected.state === 1) {
        footerButtons = [
            <Popconfirm
                title="确认不通过该申请"
                onConfirm={handleClicks}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                key="no"
            >
                <Button danger>不通过</Button>
            </Popconfirm>
        ];
    } else if (selected.state === 2) {
        footerButtons = [
            <Popconfirm
                title="确认通过该申请"
                onConfirm={handleClick}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                key="ok"
            >
                <Button>通过</Button>
            </Popconfirm>
        ];
    }

    return (
        <>
            <Modal
                title="审核"
                open={visible}
                onCancel={onCancel}
                width={600}
                footer={footerButtons}
            >
                <div className='main'>
                    <Form
                        name="basic"
                        disabled={true}
                        ref={FormRef}
                        initialValues={selected}
                        labelCol={{
                            span: 3,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        style={{
                            maxWidth: 500,
                        }}
                    >
                        <Form.Item
                            label="姓名"
                            name="name"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            name="info"
                            rows={4}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="证件"
                            name="user_img"
                        >
                            <Image
                                height={180}
                                src={selected.user_img}
                            />
                        </Form.Item>
                        <Form.Item
                            label="审核人"
                            name="auditor"
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
