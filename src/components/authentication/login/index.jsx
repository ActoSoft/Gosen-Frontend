import React, { Component } from 'react'
import './index.scss'
import GLogo from '../../../assets/icons/gosen_logo.png'
import GName  from '../../../assets/icons/gosen_name.png'
import InputText from '../../common/inputText/'
import InputPassword from '../../common/inputPassword/'
import MainButton from '../../common/mainButton/'

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
                        <InputText className="inputs-login"/>
                        <span>Contraseña</span>
                        <InputPassword className="inputs-login"/>
                        <p>¿Olvidaste tu contraseña?</p>
                    </div>
                    <MainButton text={`Contraseña`}/>
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