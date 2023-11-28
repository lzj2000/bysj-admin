import React from 'react';
import { Button, Modal } from 'antd';

export default function AddressDialog({ visible, onCancel, selected }) {
    return (
        <>
            <Modal title="学校数据" open={visible} onCancel={onCancel} footer={[
                <Button key="back" onClick={onCancel}>
                    关闭
                </Button>,
            ]}>
                <p>总完成订单：{selected.total_quantity}</p>
                <p>本年完成订单：{selected.year_quantity}</p>
                <p>本月完成订单：{selected.month_quantity}</p>
            </Modal>
        </>
    );
}
