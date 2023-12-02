import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import { getCards } from '../../../../api/home';

export default function Cards() {
    const [serviceDataCounts, setServiceDataCounts] = useState([])
    const [totalOrderCount, setTotalOrderCount] = useState("")
    const [userCount, setUserCount] = useState({authCount:0,totalCount:0})
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: serviceDataCounts
            }
        ]
    };
    let all = {
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: totalOrderCount,
                        fontSize: 80,
                        fontWeight: 'bold',
                        lineDash: [0, 200],
                        lineDashOffset: 0,
                        fill: 'transparent',
                        stroke: '#000',
                        lineWidth: 1
                    },
                    keyframeAnimation: {
                        duration: 3000,
                        loop: true,
                        keyframes: [
                            {
                                percent: 0.7,
                                style: {
                                    fill: 'transparent',
                                    lineDashOffset: 200,
                                    lineDash: [200, 0]
                                }
                            },
                            {
                                // Stop for a while.
                                percent: 0.8,
                                style: {
                                    fill: 'transparent'
                                }
                            },
                            {
                                percent: 1,
                                style: {
                                    fill: 'black'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    const fetchData = async () => {
        let res = await getCards()
        setServiceDataCounts(res.serviceDataCounts)
        setTotalOrderCount(res.totalOrderCount)
        setUserCount(res.userCount)
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Row gutter={10}>
                <Col span={8}>
                    <Card title="订单量" hoverable={true} style={{ height: "300px" }}>
                        <ReactECharts
                            style={{ height: '220px', width: '380px', marginLeft: "-15px" }}
                            option={all}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户量" hoverable={true} style={{ height: "300px" }}>
                        <Row gutter={16} style={{marginTop:"30px"}}>
                            <Col span={12}>
                                <Statistic valueStyle={{ color: '#3f8600', fontSize: '50px' }} title="总用户" value={userCount.totalCount} />
                            </Col>
                            <Col span={12}>
                                <Statistic valueStyle={{ color: '#1677ff', fontSize: '50px' }} title="接单员" value={userCount.authCount} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="订单占比" hoverable={true} style={{ height: "300px" }}>
                        <ReactECharts
                            style={{ height: '220px', width: '380px', marginLeft: "-15px" }}
                            option={option}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
