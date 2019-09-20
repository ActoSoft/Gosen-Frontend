import React, { useState, useEffect } from 'react'
import './index.scss'
import MainButtonOutlined from '../common/mainButtonOutlined'
import { Input } from 'antd'


const ProfileCard = ({ data, ...props }) => {
    const [state, setState] = useState({ birth_date: "", city: "", country: "", gender: "", phone_number: "", state: "", street: "", user: "", zip_code: "" })
    const [edit, setEdit] = useState({editable: false})

    useEffect(() => {
        if (data) {
            console.log(data)
            setState(data)
        }
    }, [data])

    return (
        <div className="profile-container">
            <div className="header-container">
                <div className="header-text-container">
                    <div>
                        <span className="user-fullname">{`${state.user.first_name} ${state.user.last_name}`}</span>
                        <MainButtonOutlined 
                            text='Editar' 
                            onClick={() => setEdit(prevState => ({editable: !prevState.editable}))}
                        />
                    </div>
                    <div>
                        <span className="username">{state.user.username}</span>
                    </div>
                </div>
                <div className="header-photo-container">
                    <img className="profile-photo" src={state.photo} alt="profile-pic" />
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
                    {edit.editable === true ?
                        <div className='input_container'>
                            <Input value={state.user.email} />
                            <Input value={state.phone_number} />
                            <Input value={state.gender} />
                            <Input value={state.birth_date} />
                            <Input value={state.zip_code} />
                        </div>
                    :
                        <div>
                            <p>{state.user.email}</p>
                            <p>{state.phone_number}</p>
                            <p>{state.gender}</p>
                            <p>{state.birth_date}</p>
                            <p>{state.zip_code}</p>
                        </div>
                    }
                </div>
                <div className="data-column labels data-column-2">
                    <p>Calle</p>
                    <p>Ciudad</p>
                    <p>Estado</p>
                    <p>País</p>
                </div>
                <div className="data-column info data-column-info-2">
                    {edit.editable === true ?
                        <div className='input_container'>
                            <Input value={state.street} />
                            <Input value={state.city} />
                            <Input value={state.state} />
                            <Input value={state.country} />
                        </div>
                    :
                        <div>
                            <p>{state.street}</p>
                            <p>{state.city}</p>
                            <p>{state.state}</p>
                            <p>{state.country}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileCard