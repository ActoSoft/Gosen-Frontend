import React, { Fragment } from 'react'
import { Card, Icon, Col, Row } from 'antd'
import { validateImageOnItem, validateExist } from '../../../utils'
import './index.scss'
import defaultProduct from '../../../assets/default-product.png'

const { Meta } = Card

const CardList = props => 
    <Fragment>
        <Row className="row-title">
            <Col span={24}>
                <p>{props.title}</p>
                <Icon
                    type="plus-square"
                    className="add-icon"
                    onClick={()=>props.history.push(`${props.URL}/crear/`)}
                />
            </Col>
        </Row>
        <Row className="card-list-container">
            {
                props.data && props.data.length > 0 ?
                    props.data.map(item => 
                        <Col span={6} key={item.id}>
                            <CardItem
                                item={item}
                                history={props.history}
                                URL={props.URL}
                            />
                        </Col>
                    )
                    : null
            }
        </Row>
    </Fragment>

const CardItem = ({item, history, URL}) => 
    <Card
        onClick={()=>history.push(`${URL}/{item.id}/`)}
        className="card-item"
        cover={
            <img
                alt={item.name}
                src={validateImageOnItem(item) ? validateImageOnItem(item) : defaultProduct}
            />
        }
        actions={[
            <Icon type="edit" key="edit" />,
            <Icon type="delete" key="delete" />,
        ]}
    >
        <Meta
            title={validateExist(item.name)}
            description={validateExist(item.description)}
        />
    </Card>

export default CardList