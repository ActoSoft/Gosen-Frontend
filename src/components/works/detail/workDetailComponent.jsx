import React, { Fragment } from 'react'
import MainButtonOutlined from '../../common/mainButtonOutlined'
import { Skeleton, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import {
    validateExist,
    formatDate,
    joinUserName,
} from '../../../utils'
import { getWorkStatus } from '../../../consts'

const WorkDetailComponent = ({ data, editURL, handleDelete }) =>
    <div className="profile-container">
        { data ?
            <div>
                <div className="header-container">
                    <div className="header-text-container">
                        <div>
                            <span className="user-fullname">{`Trabajo #${data.id}`}</span>
                            <Link to = {`${editURL}editar/`}>
                                <MainButtonOutlined
                                    text='Editar'
                                />
                            </Link>
                            <MainButtonOutlined
                                className='delete-button'
                                text='Eliminar'
                                onClick={handleDelete}
                            />
                        </div>
                    </div>
                </div>
                <div className="data-container">
                    <Row className="work-rows">
                        <Col span={8}>
                            <WorkProperty
                                label='Servicio'
                                value={validateExist(data.service.name)}
                                link={`/servicios/${data.service.id}`}
                            />
                        </Col>
                        <Col span={16}>
                            <WorkProperty
                                label='Cliente'
                                value={joinUserName(data.client.user)}
                                link={`/clientes/${data.client.id}`}
                            />
                        </Col>
                    </Row>
                    <Row className="work-rows">
                        <Col span={8}>
                            <WorkProperty
                                label='Status'
                                value={getWorkStatus(data.status)}
                            />
                        </Col>
                        <Col span={16}>
                            <WorkProperty
                                label='Empleados'
                                value={data.employees.map(({employee}) => joinUserName(employee.user))}
                                link={data.employees.map(({employee}) => `/empleados/${employee.id}`)}
                            />
                        </Col>
                    </Row>
                    <Row className="work-rows">
                        <Col span={8}>
                            <WorkProperty
                                label='No. de servicios'
                                value={validateExist(data.qty)}
                            />
                        </Col>
                        <Col span={16}>
                            <WorkProperty
                                label='Fecha de inicio'
                                value={formatDate(data.datetime_start)}
                            />
                        </Col>
                    </Row>
                    <Row className="work-rows">
                        <Col span={16}>
                            <WorkProperty
                                label='Fecha de finalización'
                                value={formatDate(data.datetime_end)}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            :
            <div className="skeleton">
                <Skeleton active />
            </div>
        }
    </div>

const WorkProperty = ({label, value, link}) => {
    console.log(link)
    return (
        <Fragment>
            <p className="work-label">{label}</p>
            {
                Array.isArray(value) ?
                    <ul>
                        {
                            value.length > 0 ?
                                value.map((v, index) =>
                                    <Link key={index} to={link[index]}>
                                        <li className="work-link work-value many-work-values">{v}</li>
                                    </Link>
                                )
                                :
                                <p className="work-value">No hay empleados</p>
                        }
                    </ul>
                    : link ?
                        <Link to={link}>
                            <p className="work-value work-link">{value}</p>
                        </Link>
                        : <p className="work-value">{value}</p>
            }
        </Fragment>
    )
}

export default WorkDetailComponent
export { WorkProperty }