import React, { Component, Fragment } from 'react'
import { worksEndpoint, financialsEndpoint } from '../../../utils/backendEndpoints'
import CRUD, { post } from '../../../services'
import WorkDetailReusable from './workDetailComponent'
import {
    WorkPaymentComponent,
    AddPaymentComponent,
    PaymentHistoryComponent
} from './workPaymentComponent'
import { Skeleton, Row, Col, Icon } from 'antd'
import { toast } from 'react-toastify'
import './index.scss'

export default class WorkDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false,
            paymentStatus: null,
            newPayment: {
                concept: '',
                amount: ''
            }
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

    handleClickOnLeftArrowIcon = () => {
        this.setState({ paymentStatus: null })
    }

    handleDelete = () => {
        if(window.confirm('¿Deseas realmente eliminar este trabajo?')) {
            CRUD.softDelete(worksEndpoint, this.workId)
                .then(() => {
                    toast.success('El trabajo ha sido eliminado')
                    setTimeout(() => this.props.history.push('/trabajos/'), 3000)
                })
                .catch(error => {
                    console.log(error.response)
                    toast.error('Algo falló al eliminar')
                })
        }
    }

    handleChangeNewPaymentValues = e => {
        const { newPayment } = this.state
        newPayment[e.target.name] = e.target.value
        this.setState({ newPayment })
    }

    changeModeToAddPayment = () => {
        this.setState({
            paymentStatus: 'add'
        })
    }

    changeModeToHistoryPayments = () => {
        this.setState({
            paymentStatus: 'history'
        })
    }

    handleAddPayment = async () => {
        const { newPayment } = this.state
        const { amount, concept } = newPayment
        try {
            const body = {
                amount: parseInt(amount),
                concept,
                type: 'income',
                work: this.workId
            }
            const response = await post(`${financialsEndpoint}create_transaction/`, body)
            if (response.data) {
                toast.success('Pago registrado correctamente')
                let { newPayment } = this.state
                newPayment.amount = ''
                newPayment.concept = ''
                this.setState({
                    data: response.data,
                    newPayment,
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        const {
            data,
            isReady,
            paymentStatus,
            newPayment
        } = this.state
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
                                        <div className="profile-container">
                                            {   paymentStatus ?
                                                <Icon
                                                    type="arrow-left"
                                                    className="work-arrow-left"
                                                    onClick={ this.handleClickOnLeftArrowIcon }
                                                    style={{ width: 28 }}
                                                />
                                                : null
                                            }
                                            { !paymentStatus ?
                                                <WorkPaymentComponent
                                                    data={data}
                                                    changeModeToAddPayment={this.changeModeToAddPayment}
                                                    changeModeToHistoryPayments={this.changeModeToHistoryPayments}
                                                />
                                                : paymentStatus === 'add' ?
                                                    <AddPaymentComponent
                                                        data={data}
                                                        newPayment={newPayment}
                                                        handleChangeNewPaymentValues={this.handleChangeNewPaymentValues}
                                                        handleAddPayment={this.handleAddPayment}
                                                    />
                                                    :
                                                    <PaymentHistoryComponent
                                                        data={data}
                                                    />
                                            }
                                        </div>
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