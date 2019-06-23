import React, { Component } from 'react'
import './index.scss'
import GLogo from '../../../assets/icons/gosen_logo.png'
import GName  from '../../../assets/icons/gosen_name.png'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div className="login-ui-container">
                <div className="left-container">
                    <span className="login-title">Iniciar sesión</span>
                    <div className="form-part">
                        <span>Usuario</span>
                        <input type="text"/>
                        <span>Contraseña</span>
                        <input type="password"/>
                        <p>¿Olvidaste tu contraseña?</p>
                    </div>
                    <button>Contraseña</button>
                </div>
                <div className="right-container">
                    <img src={ GLogo } alt="Logo Gosen" />
                    <img src={ GName } alt="Nombre Gosen" />
                </div>
            </div>
        )
    }
}

export default Login