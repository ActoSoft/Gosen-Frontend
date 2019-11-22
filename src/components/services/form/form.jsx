import React from 'react'
import { Skeleton } from 'antd'
import MainButton from '../../common/mainButton'
import SecondaryButton from '../../common/secondaryButton'
import { Link } from 'react-router-dom'
import InputText from '../../common/inputText'
import SelectComponent from '../../common/select'
import { paymentOptions } from '../../../utils/'

const validateExist = (value) => {
    if(!value) return ''
    return value
}
const Form = (
    {
        data,
        events,
        isCreate,
        model = '',
        goBack,
    }) =>
    <div className='profile-container service-container'>
        {/* eslint-disable-next-line */}
        {!isCreate && data || isCreate ?
            <div>
                <div className="header-container services">
                    <div className="header-text-container-update">
                        <p>{
                            !isCreate
                                ? `Editar ${data.name}`
                                : `Agregar nuevo ${model}`
                        }</p>
                        <div className="buttons-service-form">
                            <MainButton
                                text='Guardar'
                                className="edit-buttons"
                                onClick={e => events('handleSubmit', {e})}
                            />
                            <Link to={goBack}>
                                <SecondaryButton text='Cancelar' className="edit-buttons cancel-button" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="form">
                    <div className="column column-services">
                        <InputGroup
                            label='Nombre'
                            value={validateExist(data.name)}
                            placeholder='Nombre'
                            name='name'
                            onChange={e => events('handleChange', { e })}
                        />
                        <InputGroup
                            label='Descripción'
                            value={validateExist(data.description)}
                            placeholder='Descripción'
                            name='description'
                            onChange={e => events('handleChange', { e })}
                        />
                        <InputGroup
                            label='Costo'
                            value={validateExist(data.cost)}
                            placeholder='$$$'
                            name='cost'
                            onChange={e => events('handleChange', { e })}
                        />
                        <InputGroup
                            type='select'
                            label='Tipo de pago'
                            name='payment_type'
                            value={validateExist(data.payment_type)}
                            searchable={true}
                            options={paymentOptions}
                            onChange={value => events('handleChangeSelect', {
                                name: 'payment_type',
                                value
                            })}
                        />
                    </div>    
                </div>
            </div>
            :
            <div>
                <Skeleton active/>
            </div>
        }
    </div>

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

export default Form
