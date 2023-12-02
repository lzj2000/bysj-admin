import React, { useEffect, useRef } from 'react';
import { Modal, Button, Form, Input, Row, Col } from 'antd';

export default function OtherDialog({ visible, onCancel, selected }) {
  const otherDialog = useRef(null)
    useEffect(() => {
        otherDialog && otherDialog.current && otherDialog.current.setFieldsValue(selected);
    }, [selected])
    return (
        <>
            <Modal
                title="订单详情"
                open={visible}
                onCancel={onCancel}
                width={600}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        关闭
                    </Button>,
                ]}
            >
                <div style={{marginTop:"10px"}}>
                    <Form
                        name="other"
                        disabled={true}
                        ref={otherDialog}
                        initialValues={selected}
                        labelAlign="left"

                        style={{
                            maxWidth: 500,
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="姓名"
                                    name="name"
                                    labelCol={{
                                        span: 6,
                                    }}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="电话"
                                    name="phone"
                                    labelCol={{
                                        span: 6,
                                    }}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="接单人"
                                    labelCol={{
                                        span: 6,
                                    }}
                                    name="receiver_name"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="电话"
                                    labelCol={{
                                        span: 6,
                                    }}
                                    name="receiver_phone"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={23}>
                                <Form.Item
                                    labelCol={{
                                        span: 3,
                                    }}
                                    label="备注"
                                    name="info"
                                    rows={4}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            </Col>
                        </Row>




                    </Form>
                </div>
            </Modal>
        </>
    )
}
