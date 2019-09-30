import React from 'react'
import { Input, Radio, Select, Skeleton } from 'antd'
import MainButton from '../common/mainButton'
import SecondaryButton from '../common/secondaryButton'

const ProfileForm = ({data, events }) =>
    <div className="profile-container">
        {data ?
            <div className="header-text-conatainer">
                <span className="user-fullname">{`${data.user.first_name} ${data.user.last_name}`}</span>
                <MainButton text='Guardar'/>
                <SecondaryButton text='Cancelar' />
            </div>
            :
            <div>
                <Skeleton active/>
            </div>
        }
    </div>

export default ProfileForm
