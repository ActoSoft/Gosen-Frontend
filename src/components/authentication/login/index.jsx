import React, { Component } from 'react'
import './index.scss'
import Logo from '../../../assets/logo_transparencia_white_3x.png'
import InputText from '../../common/inputText/'
import InputPassword from '../../common/inputPassword/'
import MainButton from '../../common/mainButton/'
import TitleText from '../../common/titleText/'
import SubtitleOne from '../../common/subtitleOne'
import SubtitleTwo from '../../common/subtitleTwo'
import { NavLink } from 'react-router-dom'
import { withAuth } from '../../../Authentication'
import { loginSchemaValidator } from '../../../validators'
import { toast } from 'react-toastify'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.props.auth.handleLogin
    }

    onChangeForm = (e) => {
        const { name, value } = e.target
        this.setState(prevState => {
            const newState = { ...prevState }
            newState[name] = value
            return newState
        })
    }

    onLogin = async () => {

        const validatorResult = loginSchemaValidator(this.state)

        if (!validatorResult.error) {
            if (await this.login(this.state)) {
                this.props.history.push('/dashboard/')
            }
        } else {
            validatorResult.errors.forEach(errorMessage =>
                toast.error(errorMessage)
            )
        }

    }

    render() {
        const { username, password } = this.state
        return (
            <div className="login-ui-container">
                <div className="left-container">
                    <TitleText text='Iniciar sesión' />
                    <div className="form-part">
                        <SubtitleTwo text={'Usuario'} />
                        <InputText
                            className="inputs-login"
                            name="username"
                            value={username}
                            onChange={this.onChangeForm}
                        />
                        <SubtitleTwo text={'Contraseña'} />
                        <InputPassword
                            className="inputs-login"
                            name="password"
                            onChange={this.onChangeForm}
                            value={password}
                        />
                        <NavLink to="/recuperar-contraseña/" className="navlink">
                            <SubtitleOne text="¿Olvidaste tu contraseña?" />
                        </NavLink>
                        <MainButton text='Iniciar Sesión' onClick={this.onLogin} />
                    </div>
                </div>
                <div className="right-container">
                    <img src={Logo} alt="Logo Gosen" />
                </div>
            </div>
        )
    }
}

export default withAuth(Login)
