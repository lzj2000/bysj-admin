import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { getOptions, searchOptions } from "../../../../api/home";
import './Sale.scss'
const tabList = [
    {
        key: 'tab1',
        tab: '本年订单量',
    },
    {
        key: 'tab2',
        tab: '本周订单量',
    },
];

export default function Sale() {
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const [monthlyOrderCounts, setMonthlyOrderCounts] = useState([])
    const [weeklyOrderCounts, setWeeklyOrderCounts] = useState([])
    const [topSchoolsByYear, setTopSchoolsByYear] = useState([])
    const [topSchoolsByWeek, setTopSchoolsByWeek] = useState([])
    const [value, setValue] = useState('');
    let optionsa = {
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: monthlyOrderCounts,
                type: 'bar'
            }
        ]
    };
    let optionsb = {
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: weeklyOrderCounts,
                type: 'bar'
            }
        ]
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    const searchSchool = () => {
        if (value) {
            searchData(value)
        } else {
            fetchData()
        }
    };
    const searchData = async (school) => {
        let res = await searchOptions({ school: school })
        setMonthlyOrderCounts(res.monthlyOrderCounts)
        setWeeklyOrderCounts(res.weeklyOrderCounts)
    };
    const fetchData = async () => {
        let res = await getOptions()
        setMonthlyOrderCounts(res.monthlyOrderCounts)
        setWeeklyOrderCounts(res.weeklyOrderCounts)
        setTopSchoolsByYear(res.topSchoolsByYear)
        setTopSchoolsByWeek(res.topSchoolsByWeek)
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Card
                style={{
                    width: '100%',
                    marginTop: "10px"
                }}
                hoverable={true}
                tabList={tabList}
                tabBarExtraContent={
                    <div style={{ display: "flex" }}>
                        <Input placeholder="输入学校名" value={value} onChange={handleChange} />
                        <Button icon={<SearchOutlined />} onClick={searchSchool} />
                    </div>
                }
                activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
            >
                <Row gutter={10}>
                    <Col span={17}>
                        <div>
                            <ReactECharts
                                option={activeTabKey1 === "tab1" ? optionsa : optionsb}
                                style={{ width: '900px', height: '400px', marginLeft: "-50px" }}
                            />
                        </div>

                    </Col>
                    <Col span={7}>
                        <div>
                            <h3>查看排名</h3>
                            {activeTabKey1 === "tab1" && <ul style={{ padding: 0 }}>
                                {topSchoolsByYear.map((rank) => (
                                    <li key={rank.index} style={{ listStyle: 'none', margin: '20px 0' }}>
                                        {Object.values(rank).map((r, index) => (
                                            <span
                                                key={index}
                                                className={[
                                                    rank.index <= 3 ? 'topThree' : '',
                                                    index === 0 ? 'index' : '',
                                                    index === Object.values(rank).length - 1 ? 'count' : '',
                                                ].join(' ')}
                                            >
                                                {r}
                                            </span>
                                        ))}
                                    </li>
                                ))}
                            </ul>}
                            {activeTabKey1 === "tab2" && <ul style={{ padding: 0 }}>
                                {topSchoolsByWeek.map((rank) => (
                                    <li key={rank.index} style={{ listStyle: 'none', margin: '20px 0' }}>
                                        {Object.values(rank).map((r, index) => (
                                            <span
                                                key={index}
                                                className={[
                                                    rank.index <= 3 ? 'topThree' : '',
                                                    index === 0 ? 'index' : '',
                                                    index === Object.values(rank).length - 1 ? 'count' : '',
                                                ].join(' ')}
                                            >
                                                {r}
                                            </span>
                                        ))}
                                    </li>
                                ))}
                            </ul>}
                        </div>
                    </Col>
                </Row>

            </Card>
        </>
    );
}
