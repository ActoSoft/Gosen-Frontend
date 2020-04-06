import React, { Fragment } from 'react'
import { Card, Icon, Col, Row, Popconfirm, Empty } from 'antd'
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
                                handleDelete={props.handleDelete}
                            />
                        </Col>
                    )
                    :
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <span style={{color: '#FFFFFF'}}>
                                No hay productos para mostrar
                            </span>
                        }
                    />
            }
        </Row>
    </Fragment>

const CardItem = ({item, history, URL, handleDelete}) =>
    <Card
        className="card-item"
        cover={
            <img
                alt={item.name}
                src={validateImageOnItem(item) ? validateImageOnItem(item) : defaultProduct}
                onClick={()=>history.push(`${URL}/${item.id}/`)}
                // style={{height: '200px'}}
            />
        }
        actions={[
            <Icon
                type="edit"
                key="edit"
                onClick={
                    () => history.push(`${URL}/${item.id}/editar`)
                }
            />,
            <Popconfirm
                key="delete"
                title='¿Estás seguro que deseas realizar esta acción?'
                onConfirm={()=>handleDelete(item.id)}
                onCancel={() => console.log('Canceling')}
                okText="Aceptar"
                cancelText="Cancelar"
            >
                <Icon
                    type="delete"
                    key="delete"
                />
            </Popconfirm>
            ,
        ]}
    >
        <Meta
            title={validateExist(item.name)}
            description={validateExist(item.description)}
        />
    </Card>

export default CardList