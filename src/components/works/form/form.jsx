import React from 'react'
import { Skeleton, Row, Col } from 'antd'
import MainButton from '../../common/mainButton'
import SecondaryButton from '../../common/secondaryButton'
import { Link } from 'react-router-dom'
import InputText from '../../common/inputText'
import SelectComponent from '../../common/select'
import DatePicker from '../../common/datePicker'
import TextArea from '../../common/textArea'
import { validateExist, joinUserName } from '../../../utils'
import moment from 'moment'

const Form = ({
    data,
    events,
    isCreate,
    model = '',
    goBack,
    clients,
    services,
    employees
}) =>
    <div className="body-container">
        <div className="profile-container">
            {
                !isCreate && data || isCreate ?
                    <div>
                        <div className="header-container services">
                            <div className="header-text-container-update">
                                <p>{
                                    !isCreate
                                        ? `Editar ${model}`
                                        : `Agregar nuevo ${model}`
                                }</p>
                                <div className="buttons-service-form">
                                    <MainButton
                                        text='Continuar'
                                        className='edit-buttons work-buttons'
                                    />
                                    <Link to={goBack}>
                                        <SecondaryButton
                                            text='Cancelar'
                                            className='edit-buttons work-buttons cancel-buttons'
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="form flex-direction-column">
                            <Row className="work-rows">
                                <Col span={12} className="work-form-col">
                                    <InputGroup
                                        label='Cliente'
                                        value='Selecciona a un cliente'
                                        name='client'
                                        options={clients.map(client => joinUserName(client.user))}
                                        searchable={true}
                                        type='select'
                                    />
                                </Col>
                                <Col span={12} className="work-form-col">
                                    <InputGroup
                                        value='Selecciona el servicio a realizar'
                                        label='Servicio'
                                        name='service'
                                        options={services.map(service => service.name)}
                                        searchable={true}
                                        type='select'
                                    />
                                </Col>
                            </Row>
                            <Row className="work-rows work-rows-margin-vertical">
                                <Col span={12} className="work-form-col">
                                    <InputGroup
                                        label='Fecha de inicio'
                                        value={moment().format('YYYY-MM-DD')}
                                        type='datePicker'
                                        name='dateStart'
                                    />
                                </Col>
                                <Col span={12} className="work-form-col">
                                    <InputGroup
                                        label='Fecha de fin'
                                        value={moment().add(1, 'days').format('YYYY-MM-DD')}
                                        type='datePicker'
                                        name='dateEnd'
                                    />
                                </Col>
                            </Row>
                            <Row className="work-rows work-rows-margin-vertical">
                                <Col span={12} className="work-form-col">
                                    <InputGroup
                                        label='Descripción'
                                        value=''
                                        placeholder='Descripción'
                                        name='description'
                                        type="textarea"
                                    />
                                </Col>
                                <Col span={12} className="work-form-col">
                                    <InputGroup
                                        label='Cantidad'
                                        value=''
                                        placeholder='Cantidad'
                                        name='qty'
                                    />
                                </Col>
                            </Row>
                            <Row className="work-rows work-rows-margin-vertical">
                                <Col span={12} className="work-form-col">
                                    <InputGroup
                                        label='Total a pagar'
                                        value='0'
                                        name='total'
                                    />
                                </Col>
                                <Col span={12} className="work-form-col">
                                    <InputGroup
                                        label='Anticipo'
                                        value='0'
                                        name='payed'
                                    />
                                </Col>
                            </Row>
                            <Row className="work-rows work-rows-margin-vertical">
                                <Col span={18} offset={3} className="work-form-col">
                                    <InputGroup
                                        label='Empleados'
                                        name='employees'
                                        value={[]}
                                        placeholder='Selecciona los empleados a realizar el trabajo'
                                        options={employees.map(employee => joinUserName(employee.user))}
                                        searchable={true}
                                        mode='multiple'
                                        type='select'
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    :
                    <Skeleton active />
            }
        </div>
    </div>

const InputGroup = (props) =>
    <div className="form-group form-work">
        <p>{props.label}</p>
        {
            !props.type ?
                <InputText
                    value={props.value}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.onChange}
                    className={props.className}
                />
                : props.type === 'select' ?
                    <SelectComponent
                        name={props.name}
                        onChange={props.onChange}
                        value={props.value}
                        searchable={props.searchable}
                        mode={props.mode}
                        options={props.options}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                    />
                    : props.type === 'datePicker' ?
                        <DatePicker
                            value={props.value}
                            onChange={props.onChange}
                            className={props.className}
                        />
                        : props.type === 'textarea' ?
                            <TextArea
                                placeholder={props.placeholder}
                                value={props.value}
                                onChange={props.onChange}
                                className={props.className}
                            />
                            : null
        }
    </div>

export default Form
