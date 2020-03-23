import React from 'react'
import { Skeleton, Row, Col } from 'antd'
import MainButton from '../../common/mainButton'
import SecondaryButton from '../../common/secondaryButton'
import { Link } from 'react-router-dom'
import InputText from '../../common/inputText'
import SelectComponent from '../../common/select'
import DatePicker from '../../common/datePicker'
import TextArea from '../../common/textArea'
import { joinUserName } from '../../../utils'
import { getWorkStatus } from '../../../consts'

const Form = ({
    events,
    isCreate,
    model = '',
    goBack,
    clients,
    services,
    employees,
    statusItems,
    work
}) => {
    // const { RangePicker } = DatePicker
    return (
        <div className="body-container">
            <div className="profile-container">
                {
                    work ?
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
                                            text={isCreate ? 'Guardar' : 'Actualizar'}
                                            className='edit-buttons work-buttons'
                                            onClick={() => events('handleSubmit', {})}
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
                                            value={work.client ? joinUserName(work.client.user) : 'Selecciona un cliente'}
                                            name='client'
                                            options={clients.map(client => {
                                                return {
                                                    label: joinUserName(client.user),
                                                    value: client.id
                                                }
                                            })}
                                            searchable={true}
                                            type='select'
                                            onChange={id => events('handleChangeClient', { id })}
                                        />
                                    </Col>
                                    <Col span={12} className="work-form-col">
                                        <InputGroup
                                            value={work.service ? work.service.name : 'Selecciona el servicio a realizar'}
                                            label='Servicio'
                                            name='service'
                                            options={services.map(service => {
                                                return {
                                                    label: service.name,
                                                    value: service.id
                                                }
                                            })}
                                            searchable={true}
                                            type='select'
                                            onChange={id => events('handleChangeService', { id })}
                                        />
                                    </Col>
                                </Row>
                                <Row className="work-rows work-rows-margin-vertical">
                                    <Col span={12} className="work-form-col">
                                        <InputGroup
                                            label='Fecha de inicio'
                                            value={work.dateStart ? work.dateStart : '1990-01-01'}
                                            type='datePicker'
                                            name='dateStart'
                                            onChange={moment => events('handleChangeDatePicker', { name: 'dateStart', moment })}
                                        />
                                    </Col>
                                    <Col span={12} className="work-form-col">
                                        <InputGroup
                                            label='Fecha de finalización'
                                            value={work.dateEnd ? work.dateEnd : '1990-01-02'}
                                            type='datePicker'
                                            name='dateEnd'
                                            onChange={moment => events('handleChangeDatePicker', { name: 'dateEnd', moment })}
                                        />
                                    </Col>
                                </Row>
                                <Row className="work-rows work-rows-margin-vertical">
                                    <Col span={isCreate ? 12 : 8} className="work-form-col">
                                        <InputGroup
                                            label='Descripción'
                                            value={work.description ? work.description : ''}
                                            placeholder='Descripción'
                                            name='description'
                                            type="textarea"
                                            onChange={e => events('handleChangeTextarea', { name: 'description', e })}
                                        />
                                    </Col>
                                    <Col span={isCreate ? 12 : 8} className="work-form-col">
                                        <InputGroup
                                            label='Cantidad'
                                            value={work.qty ? work.qty : ''}
                                            placeholder='Cantidad'
                                            name='qty'
                                            onChange={e => events('handleChangeInputText', e)}
                                        />
                                    </Col>
                                    {!isCreate ?
                                        <Col span={8} className="work-form-col">
                                            <InputGroup
                                                type='select'
                                                label='Status'
                                                value={work.status ? getWorkStatus(work.status) : ''}
                                                placeholder='Status'
                                                options={statusItems}
                                                name='status'
                                                onChange={value => events('handleChangeStatus', value)}
                                            />
                                        </Col>
                                        : null
                                    }
                                </Row>
                                <Row className="work-rows work-rows-margin-vertical">
                                    <Col span={8} className="work-form-col">
                                        <InputGroup
                                            label='Total a pagar'
                                            value={work.total ? work.total : ''}
                                            name='total'
                                            onChange={e => events('handleChangeInputText', e)}
                                        />
                                    </Col>
                                    <Col span={8} className="work-form-col">
                                        <InputGroup
                                            label={isCreate ? 'Anticipo' : 'Pagado'}
                                            value={work.payed ? work.payed : ''}
                                            name='payed'
                                            onChange={e => events('handleChangeInputText', e)}
                                        />
                                    </Col>
                                    <Col span={8} className="work-form-col">
                                        <InputGroup
                                            label='Restante'
                                            value={work.toPay ? work.toPay : ''}
                                            name='toPay'
                                            onChange={e => events('handleChangeInputText', e)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="work-rows work-rows-margin-vertical">
                                    <Col span={18} offset={3} className="work-form-col">
                                        <InputGroup
                                            label='Empleados'
                                            name='employees'
                                            value={work.employees && work.employees.length > 0 ?
                                                work.employees.map(employee =>
                                                    employee.id)
                                                : []}
                                            placeholder='Selecciona los empleados a realizar el trabajo'
                                            options={employees.map(employee => {
                                                return {
                                                    label: joinUserName(employee.user),
                                                    value: employee.id
                                                }
                                            })}
                                            searchable={true}
                                            mode='multiple'
                                            type='select'
                                            onChange={ids => events('handleChangeEmployees', { ids })}
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
    )}

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
