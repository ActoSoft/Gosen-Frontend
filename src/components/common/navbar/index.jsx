import React from 'react'
import './index.scss'
import { Icon } from 'antd'
import Logo from '../../../assets/logo_transparencia_1x.png'

const Navbar = () =>
    <div className="navbar">
        <div className="icon-container">
            <Icon type="menu" />
        </div>
        <div className="logo-container">
            <img className="navbar-logo" src={Logo} alt="Logo Gosen" />
        </div>
    </div>

export default Navbar