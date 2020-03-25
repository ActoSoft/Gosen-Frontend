import React, { Fragment } from 'react'
import MainButton from '../../common/mainButton'
import { Skeleton, Row, Col, Empty } from 'antd'
import { WorkProperty } from './workDetailComponent'
import InputText from '../../common/inputText'
import {
    validateExist,
    formatCosts,
    formatDate
} from '../../../utils'

const WorkPaymentComponent = ({
    data,
    changeModeToAddPayment,
    changeModeToHistoryPayments
}) =>
    <Fragment>
        { data ?
            <div>
                <p className="work-label-title">Pagos</p>
                <Row className="work-rows">
                    <Col span={24}>
                        <WorkProperty
                            label='Total'
                            value={formatCosts(data.total)}
                        />
                    </Col>
                </Row>
                <Row className="work-rows">
                    <Col span={24}>
                        <WorkProperty
                            label='Pagado'
                            value={formatCosts(data.payed)}
                        />
                    </Col>
                </Row>
                <Row className="work-rows">
                    <Col span={24}>
                        <WorkProperty
                            label='Por Pagar'
                            value={formatCosts(data.to_pay)}
                        />
                    </Col>
                </Row>
                <MainButton
                    className="add-payment-work-button"
                    text='Registrar pago'
                    onClick={changeModeToAddPayment}
                />
                <MainButton
                    className="historial-payment-works-button"
                    text='Historial'
                    onClick={changeModeToHistoryPayments}
                />
            </div>
            :
            <div className="skeleton">
                <Skeleton active />
            </div>
        }
    </Fragment>

const AddPaymentComponent = ({
    data,
    newPayment,
    handleChangeNewPaymentValues,
    handleAddPayment
}) =>
    <Fragment>
        {
            data ?
                <div className="add-payment-container">
                    <p className="work-label-title no-margin-bottom">Agregar pago</p>
                    <div className="rows">
                        <Row className="work-rows work-vertical-space">
                            <Col span={24}>
                                <p className="work-input-label">Concepto</p>
                                <InputText
                                    onChange={e => handleChangeNewPaymentValues(e)}
                                    value={newPayment.concept}
                                    className='work-input'
                                    placeholder='Concepto'
                                    name='concept'
                                />
                            </Col>
                        </Row>
                        <Row className="work-rows">
                            <Col span={24}>
                                <p className="work-input-label">Monto</p>
                                <InputText
                                    onChange={e => handleChangeNewPaymentValues(e)}
                                    value={newPayment.amount}
                                    className='work-input'
                                    placeholder='Monto'
                                    name='amount'
                                />
                            </Col>
                        </Row>
                    </div>
                    <MainButton
                        text = 'Guardar'
                        onClick={() => handleAddPayment()}
                    />
                </div>

                :
                <div className="skeleton">
                    <Skeleton active />
                </div>
        }
    </Fragment>

const PaymentHistoryComponent = ({ data }) =>
    <Fragment>
        {
            data ?
                <div>
                    <p className="work-label-title no-margin-bottom">Historial</p>
                    <div className="transactions">
                        {data.transactions && data.transactions.length > 0 ?
                            data.transactions.map(transaction =>
                                <Row key={transaction.id} className="work-rows">
                                    <Col span={24}>
                                        <div className="transaction-card">
                                            <p>Fecha: <span className="transaction-value">{formatDate(transaction.created)}</span></p>
                                            <p>Concepto: <span className="transaction-value">{validateExist(transaction.concept)}</span></p>
                                            <p className="transaction-amount">{formatCosts(transaction.amount)}</p>
                                        </div>
                                    </Col>
                                </Row>
                            )
                            : 
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <span style={{color: '#FFFFFF'}}>
                                        No historial de pagos
                                    </span>
                                }
                            />
                        }
                    </div>
                </div>
                :
                <div className="skeleton">
                    <Skeleton active />
                </div>
        }
    </Fragment>
export {
    WorkPaymentComponent,
    AddPaymentComponent,
    PaymentHistoryComponent

}