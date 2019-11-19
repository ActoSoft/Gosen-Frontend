import React from 'react'
import MainButtonOutlined from '../../common/mainButtonOutlined'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils'

const DetailReusable = ({ data, editURL, handleDelete, notProfileContainer, isStaff, isAdmin }) =>
    <div className={!notProfileContainer ? 'profile-container' : ''}>
        {data ?
            <div>
                <div className="header-container">
                    <div className="header-text-container">
                        <div>
                            <span className="user-fullname">{`${data.user.first_name} ${data.user.last_name}`}</span>
                            <Link to = {`${editURL}editar/`}>
                                <MainButtonOutlined
                                    text='Editar'
                                />
                            </Link>
                            {
                                isStaff === 'true' ?
                                    <MainButtonOutlined
                                        className='delete-button'
                                        text='Eliminar'
                                        onClick={handleDelete}
                                    />
                                    : null
                            }
                        </div>
                        <div>
                            <span className="username">{data.user.username}</span>
                        </div>
                    </div>
                    <div className="header-photo-container">
                        <img className="profile-photo" src={data.photo} alt="profile-pic" />
                    </div>
                </div>
                <div className="data-container">
                    <div className="data-column labels">
                        <p>Email</p>
                        <p>Número de teléfono</p>
                        <p>Género</p>
                        <p>Fecha de nacimiento</p>
                        <p>Código Postal</p>
                    </div>
                    <div className="data-column info data-column-info-1">
                        <div>
                            <p>{data.user.email}</p>
                            <p>{data.phone_number}</p>
                            <p>{data.gender}</p>
                            <p>{formatDate(data.birth_date)}</p>
                            <p>{data.zip_code}</p>
                        </div>
                    </div>
                    <div className="data-column labels data-column-2">
                        <p>Calle</p>
                        <p>Ciudad</p>
                        <p>Estado</p>
                        <p>País</p>
                        { isAdmin ? <p>Permisos</p> : null }
                    </div>
                    <div className="data-column info data-column-info-2">
                        <div>
                            <p>{data.street}</p>
                            <p>{data.city}</p>
                            <p>{data.state}</p>
                            <p>{data.country}</p>
                            { isAdmin ? <p>{data.user.is_staff ? 'Super Administrador' : 'Administrador'}</p> : null }
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="skeleton">
                <Skeleton active />
            </div>
        }
    </div>

export default DetailReusable