import React from 'react'
import MainButtonOutlined from '../../common/mainButtonOutlined'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { formatDate, joinUserName } from '../../../utils'
import { getPotentialEmployeeRole } from '../../../consts'

const DetailComponent = ({ data, editURL, handleDelete, notProfileContainer, isStaff }) =>
    <div className={!notProfileContainer ? 'profile-container' : ''}>
        {data ?
            <div>
                <div className="header-container">
                    <div className="header-text-container">
                        <div>
                            <span className="user-fullname">{joinUserName(data.user)}</span>
                            <Link to = {`${editURL}editar/`}>
                                <MainButtonOutlined
                                    text='Contratar'
                                />
                            </Link>
                            {
                                isStaff === 'true' ?
                                    <MainButtonOutlined
                                        className='delete-button'
                                        text='Descartar'
                                        onClick={handleDelete}
                                    />
                                    : null
                            }
                        </div>
                        <div>
                            <span className="username">{data.user.username}</span>
                        </div>
                    </div>
                    <div className="potential-employee-role-container">
                        <span>Tipo de postulante: {getPotentialEmployeeRole(data.role)}</span>
                    </div>
                </div>
                <div className="data-container">
                    <div className="data-column labels">
                        <p>Nombre</p>
                        <p>Email</p>
                        <p>Número de teléfono</p>
                        <p>Género</p>
                        <p>Fecha de nacimiento</p>
                        <p>Código Postal</p>
                    </div>
                    <div className="data-column info data-column-info-1">
                        <div>
                            <p>{data.user.first_name}</p>
                            <p>{data.user.email}</p>
                            <p>{data.phone_number}</p>
                            <p>{data.gender}</p>
                            <p>{formatDate(data.birth_date)}</p>
                            <p>{data.zip_code}</p>
                        </div>
                    </div>
                    <div className="data-column labels data-column-2">
                        <p>Apellidos</p>
                        <p>Calle</p>
                        <p>Ciudad</p>
                        <p>Estado</p>
                        <p>País</p>
                    </div>
                    <div className="data-column info data-column-info-2">
                        <div>
                            <p>{data.user.last_name}</p>
                            <p>{data.street}</p>
                            <p>{data.city}</p>
                            <p>{data.state}</p>
                            <p>{data.country}</p>
                        </div>
                    </div>
                </div>
                <div className="data-container">
                    <div className="potential-employee-observations-container">
                        <p>¿Por qué quiere trabajar con nosotros?</p>
                        <span>{data.observations}</span>
                    </div>
                </div>
            </div>
            :
            <div className="skeleton">
                <Skeleton active />
            </div>
        }
    </div>

export default DetailComponent