import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo_transparencia_3x.png'
import './index.scss'

const HomePage = () => (
    <div className="homepage-container">
        <img src={Logo} alt="Gosen Logo"/>
        <p>Empresa de Seguridad Privada en Hidalgo</p>

        <Link to='/postulate'>¡Únete al equipo!</Link>
    </div>
)

export default HomePage