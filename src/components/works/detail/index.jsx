import React, { Component, Fragment } from 'react'
import { worksEndpoint } from '../../../utils/backendEndpoints'
import CRUD from '../../../services'
import WorkDetailReusable from './workDetailComponent'
import WorkPayment from './workPaymentComponent'
import { Skeleton, Row, Col } from 'antd'
import { toast } from 'react-toastify'
import './index.scss'

export default class WorkDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false
        }
        this.workId = this.props.match.params.id
    }
    componentDidMount() {
        CRUD.findOne(worksEndpoint, this.workId)
            .then(response =>
                this.setState({
                    data: response.data,
                    isReady: true
                }))
            .catch(error => console.log(error))
    }

    handleDelete = () => {
        if(window.confirm('¿Deseas realmente eliminar este trabajo?')) {
            CRUD.softDelete(worksEndpoint, this.workId)
                .then(response => {
                    console.log(response.data)
                    toast.success('El trabajo ha sido eliminado')
                    setTimeout(() => this.props.history.push('/trabajos/'), 3000)
                })
                .catch(error => {
                    console.log(error.response)
                    toast.error('Algo falló al eliminar')
                })
        }
    }

    render() {
        const { data, isReady } = this.state
        const { pathname } = this.props.location
        return (
            <Fragment>
                <div className="body-container">
                    {
                        isReady ?
                            <div className="products-detail-container">
                                <Row className="work-rows">
                                    <Col span={15}>
                                        <WorkDetailReusable
                                            data={data}
                                            editURL={pathname}
                                            handleDelete={this.handleDelete}
                                        />
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <WorkPayment
                                            data={data}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            :
                            <Skeleton active></Skeleton>
                    }
                </div>
            </Fragment>
        )
    }
}