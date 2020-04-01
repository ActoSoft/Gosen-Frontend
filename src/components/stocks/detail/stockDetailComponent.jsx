import React from 'react'
import MainButtonOutlined from '../../common/mainButtonOutlined'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom'

const DetailReusable = ({ data, editURL, handleDelete, attributes }) =>
    <div className='profile-container'>
        {data ?
            <div>
                <div className="header-container">
                    <div className="header-text-container">
                        <div>
                            <span className="user-fullname">{`${data.name}`}</span>
                            <Link to = {`${editURL}/editar/`}>
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
                    {  attributes && attributes.length > 0 ?
                        attributes.map((attribute, index) =>
                            <DataItem
                                key={index}
                                label={attribute.label}
                                value={attribute.value}
                            />
                        )
                        : null
                    }
                </div>
            </div>
            :
            <div className="skeleton">
                <Skeleton active />
            </div>
        }
    </div>

const DataItem = ({label, value}) =>
    <div className="data-item">
        <div className="label">
            <p>{label}</p>
        </div>
        <div className="value">
            <p>{value}</p>
        </div>
    </div>


export default DetailReusable