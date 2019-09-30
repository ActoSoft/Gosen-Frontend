import React from 'react'
import { Input, Radio, Select, Skeleton } from 'antd'
import MainButton from '../common/mainButton'
import SecondaryButton from '../common/secondaryButton'
import { Link } from 'react-router-dom'
import InputText from '../common/inputText/'

const ProfileForm = ({data, events }) =>
    <div className="profile-container">
        {data ?
            <div>
                <div className="header-container">
                    <div className="header-text-container-update">
                        <div>
                            <span className="user-fullname">{`${data.user.first_name} ${data.user.last_name}`}</span>
                            <MainButton text='Guardar' className="edit-buttons"/>
                            <Link to='/perfil/'>
                                <SecondaryButton text='Cancelar' className="edit-buttons cancel-button" />
                            </Link>
                        </div>
                        <div>
                            <span className="username">{data.user.username}</span>
                        </div>
                    </div>
                    <div className="header-photo-container">
                        <img className="profile-photo" src={data.photo} alt="profile-pic" />
                    </div>
                </div>
                <div className="form">
                    <div className="column">
                        <InputGroup
                            label='Nombre'
                            value={data.user.first_name}
                            placeholder='Nombre'
                            name='first_name'
                            onChange={ (e) => events('handleChange', {e, intoUser: true})}
                        />
                        <InputGroup
                            label='Apellidos'
                            value={data.user.last_name}
                            placeholder='Apellidos'
                            name='last_name'
                            onChange={ (e) => events('handleChange', {e, intoUser: true})}
                        />
                        <InputGroup
                            label='Usuario'
                            value={data.user.username}
                            placeholder='Usuario'
                            name='username'
                            onChange={ (e) => events('handleChange', {e, intoUser: true})}
                        />
                        <InputGroup
                            label='Correo'
                            value={data.user.email}
                            placeholder='Correo'
                            name='email'
                            onChange={ (e) => events('handleChange', {e, intoUser: true})}
                        />
                        <InputGroup
                            label='Teléfono'
                            value={data.phone_number}
                            placeholder='Teléfono'
                            name='phone_number'
                            onChange={ (e) => events('handleChange', {e})}
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
        <InputText
            value={props.value}
            placeholder={props.placeholder}
            name={props.name}
            onChange={props.onChange}
        />
    </div>

export default ProfileForm
