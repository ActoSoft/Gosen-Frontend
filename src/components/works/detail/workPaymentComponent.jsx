import React from 'react'
import MainButton from '../../common/mainButton'
import MainButtonOutlined from '../../common/mainButtonOutlined'
import { Skeleton, Row, Col } from 'antd'
import { WorkProperty } from './workDetailComponent'
import {
    validateExist,
    formatCosts
} from '../../../utils'

const WorkPaymentComponent = ({ data }) =>
    <div className="profile-container work-payment-container">
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
                />
                <MainButton
                    className="historial-payment-works-button"
                    text='Historial'
                />
            </div>
            :
            <div className="skeleton">
                <Skeleton active />
            </div>
        }
    </div>

export default WorkPaymentComponent