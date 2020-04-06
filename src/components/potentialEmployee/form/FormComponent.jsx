import React from 'react'
import { Skeleton } from 'antd'
import MainButton from '../../common/mainButton'
import InputText from '../../common/inputText'
import DatePicker from '../../common/datePicker'
import RadioButton from '../../common/radioButton'
import TextArea from '../../common/textArea'
import { cities, validateExist } from '../../../utils'
import SelectComponent from '../../common/select'
import Logo from '../../../assets/logo_transparencia_1x.png'
const Form = (
    {
        data,
        events,
        isReady
    }) =>
    <>
    <div className="logo-public-container">
        <img
            className="navbar-logo"
            src={Logo}
            alt="Logo Gosen"
        />
    </div>
    <div className='profile-container'>
        {
            isReady ?
                <div>
                    <div className="header-container">
                        <div className="header-text-container-update">
                            <div>
                                <span className="user-fullname">
                                    Postúlate para ser parte de nuestro equipo de trabajo
                                </span>
                                <MainButton
                                    text='¡Enviar solicitud!'
                                    className="edit-buttons"
                                    onClick={e => events('handleSubmit', {e})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form">
                        <div className="column">
                            <InputGroup
                                label='Nombre'
                                value={validateExist(data.user.first_name)}
                                placeholder='Nombre'
                                name='first_name'
                                onChange={e => events('handleChange', { e, intoUser: true })}
                            />
                            <InputGroup
                                label='Apellidos'
                                value={validateExist(data.user.last_name)}
                                placeholder='Apellidos'
                                name='last_name'
                                onChange={e => events('handleChange', { e, intoUser: true })}
                            />
                            <InputGroup
                                label='Usuario'
                                value={validateExist(data.user.username)}
                                placeholder='Usuario'
                                name='username'
                                onChange={e => events('handleChange', { e, intoUser: true })}
                            />
                            <InputGroup
                                label='Correo'
                                value={validateExist(data.user.email)}
                                placeholder='Correo'
                                name='email'
                                onChange={e=> events('handleChange', { e, intoUser: true })}
                            />
                            <InputGroup
                                label='Teléfono'
                                value={validateExist(data.phone_number)}
                                placeholder='Teléfono'
                                name='phone_number'
                                onChange={e => events( 'handleChange', { e })}
                            />
                            <InputGroup
                                label='Nacimiento'
                                value={data.birth_date ? data.birth_date : '1990-01-01' }
                                onChange={moment => events('handleChangeDate', { name: 'birth_date', moment })}
                                type='datePicker'
                            />
                        </div>
                        <div className="column">
                            <InputGroup
                                label='Género'
                                type='radio'
                                name='gender'
                                value={validateExist(data.gender)}
                                className='radio-gender'
                                options={[
                                    {
                                        value: 'masculino',
                                        readable: 'Masculino'
                                    },
                                    {
                                        value: 'femenino',
                                        readable: 'Femenino'
                                    }
                                ]}
                                onChange={e => events('handleChange', { e })}
                            />
                            <InputGroup
                                label='Calle'
                                value={validateExist(data.street)}
                                onChange={e => events('handleChange', { e })}
                                placeholder='Dirección'
                                name='street'
                            />
                            <InputGroup
                                label='Ciudad'
                                value={validateExist(data.city)}
                                onChange={e => events('handleChange', { e })}
                                placeholder='Ciudad'
                                name='city'
                            />
                            <InputGroup
                                type='select'
                                label='Estado'
                                name='state'
                                value={validateExist(data.state)}
                                searchable={true}
                                options={cities}
                                onChange={value => events('handleChangeSelect', { name: 'state', value })}
                            />
                            <InputGroup
                                type='select'
                                label='País'
                                name='country'
                                value={data.country ? data.country : 'México'}
                                disabled={true}
                                onChange={value => events('handleChangeSelect', { name: 'country', value })}
                            />
                            <InputGroup
                                label='Código Postal'
                                name='zip_code'
                                value={validateExist(data.zip_code)}
                                onChange={e => events('handleChange', { e })}
                            />
                        </div>
                    </div>
                    <div className="potential-employee-extra-form">
                        <InputGroup
                            type='select'
                            label='Tipo de empleado'
                            name='role'
                            value={data.role ? data.role : ''}
                            options={
                                [
                                    { label: 'Ventas (Servicio al cliente)', value: 'sales' },
                                    { label: 'Interno (Labores internas)', value: 'internal' },
                                ]
                            }
                            onChange={value => events('handleChangeSelect', { name: 'role', value })}
                        />
                        <p className="textarea-text">¿Por qué te gustaría trabajar con nosotros?</p>
                        <InputGroup
                            type='textarea'
                            placeholder='Cuéntanos porque te gustaría trabajar con nosotros'
                            name='observations'
                            onChange={e => events('handleChange', { e })}
                            value={validateExist(data.observations)}
                        />
                    </div>
                </div>
                :
                <div>
                    <Skeleton active/>
                </div>
        }
    </div>
    </>

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
                            : props.type === 'textarea' ?
                                <TextArea
                                    name={props.name}
                                    placeholder={props.placeholder}
                                    onChange={props.onChange}
                                    value={props.value}
                                />
                                : null
        }
    </div>

export default Form
