import React, { Fragment } from 'react'
import { Skeleton } from 'antd'
import InputText from '../../common/inputText'
import DatePicker from '../../common/datePicker'
import RadioButton from '../../common/radioButton'
import { paymentOptions } from '../../../utils'
import SelectComponent from '../../common/select'
import moment from 'moment'

const validateExist = (value) => {
    if(!value) return ''
    return value
}

const ContractForm = ({ data, events, isCreate }) =>
    <Fragment>
        {/* eslint-disable-next-line */}
        {!isCreate && data || isCreate ?
            <div>
                <div className="form not-margin-top">
                    <div className="column">
                        <InputGroup
                            label='Salario'
                            value={validateExist(data.salary)}
                            placeholder='$$$'
                            name='salary'
                            onChange={e => events('handleChange', { e })}
                        />
                        <InputGroup
                            label='Inicio de contrato'
                            value={data.contract_date_start ? data.contract_date_start : moment.format('YYYY-MM-DD') }
                            onChange={moment => events('handleChangeDate', { name: 'contract_date_start', moment })}
                            type='datePicker'
                        />
                    </div>
                    <div className="column">
                        <InputGroup
                            label='Pago'
                            type='select'
                            name='payment_type'
                            value={validateExist(data.payment_type)}
                            searchable={true}
                            options={paymentOptions}
                            onChange={value => events('handleChangeSelect', { name: 'payment_type', value })}
                        />
                        <InputGroup
                            label='Duración del contrato'
                            value={validateExist(data.vigency)}
                            placeholder='1 año'
                            name='vigency'
                            onChange={e => events('handleChange', { e })}
                        />
                    </div>
                </div>
            </div>
            :
            <div>
                <Skeleton active/>
            </div>
        }
    </Fragment>

const InputGroup = (props) =>
    <div className="form-group">
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
                : props.type === 'datePicker' ?
                    <DatePicker
                        value={props.value}
                        onChange={props.onChange}
                        className={props.className}
                    />
                    : props.type === 'radio' ?
                        <RadioButton
                            name={props.name}
                            value={props.value}
                            options={props.options}
                            onChange={props.onChange}
                            className={props.className}
                        />
                        : props.type === 'select' ?
                            <SelectComponent
                                name={props.name}
                                onChange={props.onChange}
                                value={props.value}
                                searchable={props.searchable}
                                options={props.options}
                                disabled={props.disabled}
                            />
                            : null
        }
    </div>

export default ContractForm
