import React from 'react'
import { Skeleton } from 'antd'
import MainButton from '../../common/mainButton'
import SecondaryButton from '../../common/secondaryButton'
import { Link } from 'react-router-dom'
import InputText from '../../common/inputText'
import DatePicker from '../../common/datePicker'
import RadioButton from '../../common/radioButton'
import { cities, formatURL } from '../../../utils'
import SelectComponent from '../../common/select'
import './index.scss'

const validateExist = (value) => {
    if(!value) return ''
    return value
}

const Form = ({ data, events, isCreate, model = '', goBack }) =>
    <div className="profile-container">
        {!isCreate && data || isCreate ?
            <div>
                <div className="header-container">
                    <div className="header-text-container-update">
                        <div>
                            <span className="user-fullname">{
                                !isCreate
                                    ? `${data.user.first_name} ${data.user.last_name}`
                                    : `Agregar nuevo ${model}`
                            }</span>
                            <MainButton
                                text='Guardar'
                                className="edit-buttons"
                                onClick={e => events('handleSubmit', {e})}
                            />
                            <Link to={goBack}>
                                <SecondaryButton text='Cancelar' className="edit-buttons cancel-button" />
                            </Link>
                        </div>
                        <div>
                            <span className="username">{validateExist(data.user.username)}</span>
                        </div>
                    </div>
                    {
                        !isCreate ?
                            <div className="header-photo-container">
                                <img
                                    className="profile-photo"
                                    src={validateExist(formatURL(data.photo))}
                                    alt="profile-pic" />
                                <label className="input-change-file">
                                    Cambiar imagen
                                    <input
                                        type="file"
                                        style={{display: 'none'}}
                                        onChange={({target}) =>
                                            events('handleChangeImage', { file: target.files[0] })}
                                    />
                                </label>
                            </div>
                            : null}
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
                            onChange={moment => events('handleChangeDate', { moment })}
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

export default Form
