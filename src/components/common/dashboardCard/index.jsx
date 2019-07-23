import React from 'react'
import './index.scss'
import {Card, Avatar} from 'antd'

const { Meta } = Card

const DashboardCardComponent = (props) =>
    <div className="card-container">
        <Card style={{ width: props.width, marginTop: 10, backgroundColor: "#000" }}>
            <Meta
                avatar={
                    <Avatar
                        shape="square"
                        icon={props.icon}
                        size={props.size}
                    />
                }
                title={props.title}
                description={props.description}
            />
        </Card>
    </div>

export default DashboardCardComponent