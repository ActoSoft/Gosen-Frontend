import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo_transparencia_3x.png'
import './index.scss'

const HomePage = () => (
    <div className="homepage-container">
        <div className="homepage-navbar">
            <NavLink to='/login/'>
                Ingresar
            </NavLink>
            <NavLink to='/postulate/'>
                Postúlate
            </NavLink>
        </div>
        <img src={Logo} alt="Gosen Logo"/>
        <p>Empresa de Seguridad Privada en Hidalgo</p>

        <Link to='/postulate'>¡Únete al equipo!</Link>
    </div>
)

export default HomePage