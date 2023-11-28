import React from 'react'
import { Button, Form, Input, Select, DatePicker, Space, theme, Row, Col } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

export default function Search(props) {
    const { onClick } = props;
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const onFinish = (values) => {
        onClick(values)
    };
    const onReset = () => {
        form.resetFields();
    };
    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                break;
            case 'female':
                break;
            case 'other':
                break;
            default:
        }
    };
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };
    return (
        <div>
            <Form
                name="basic"
                form={form}
                style={formStyle}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="用户昵称"
                            name="name"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="用户手机号"
                            name="phone"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="type"
                            label="状态"
                        >
                            <Select
                                placeholder="选择订单状态"
                                onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="0">待接单</Option>
                                <Option value="1">接单中</Option>
                                <Option value="2">已完成</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="接单人姓名"
                            name="receiver_name"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="订单创建时间" name="created_time">
                            <RangePicker format={dateFormat} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="订单完成时间" name="complete_time">
                            <RangePicker format={dateFormat} />
                        </Form.Item>
                    </Col>
                </Row>
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space size="small">
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        <Button
                            onClick={onReset}
                        >
                            重置
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    )
}
