import React, { useEffect, useRef } from 'react';
import { Modal, Button, Image, Form, Input, Row, Col } from 'antd';


export default function DeliveryDialog({ visible, onCancel, selected }) {
    const deliveryDialog = useRef(null)
    useEffect(() => {
        deliveryDialog && deliveryDialog.current && deliveryDialog.current.setFieldsValue(selected);
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
                <div style={{ marginTop: "10px" }}>
                    <Form
                        name="delivery"
                        disabled={true}
                        ref={deliveryDialog}
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
                                    label="地址"
                                    name="details"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={23}>
                                {selected.img && (
                                    <Form.Item label="图片" labelCol={{
                                        span: 3,
                                    }}>
                                        <div style={{ display: 'flex' }}>
                                            {[selected.img.img1, selected.img.img2, selected.img.img3].filter(Boolean).map((imgSrc, index) => (
                                                <div key={index} style={{ marginRight: '10px' }}>
                                                    <Image width={120} height={120} src={imgSrc} />
                                                </div>
                                            ))}
                                        </div>
                                    </Form.Item>
                                )}
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
