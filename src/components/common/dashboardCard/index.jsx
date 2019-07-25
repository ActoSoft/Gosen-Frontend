import React from 'react'
import './index.scss'
import { Card, Icon } from 'antd'

const { Meta } = Card

const DashboardCardComponent = (props) =>
    <div className="card-container">
        <Card style={{ width: props.width, marginTop: 10, backgroundColor: "#000" }} hoverable={true}>
            <Meta
                avatar={
                    <Icon type={props.icon} />
                }
                title={props.title}
                description={props.description}
            />
        </Card>
    </div>

export default DashboardCardComponent