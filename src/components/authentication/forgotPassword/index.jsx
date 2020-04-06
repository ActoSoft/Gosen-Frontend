import React, { Component } from 'react'
import './index.scss'
import padlock from '../../../assets/icons/padlock.svg'
import MainButton from '../../common/mainButton'
import TitleText from '../../common/titleText'
import SubtitleOne from '../../common/subtitleOne'
import InputText from '../../common/inputText'
import { NavLink } from 'react-router-dom'
import { withAuth } from '../../../Authentication/'
import { validateRequest } from '../../../validators'
import { toast } from 'react-toastify'

class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
        this.textForgot = 'No te preocupes.\nIngresa el correo electrónico que tienes ligado a tu cuenta y en unos minutos recibirás un correo electrónico con los pasos necesarios para que puedas recuperarla 😉'
        this.resetPassword = this.props.auth.handleResetPassword
    }

    handleResetPassword = async () => {
        const validatorResult = await validateRequest('forgotPassword', this.state)

        if (!validatorResult.error) {
            await this.resetPassword(this.state)
        } else {
            validatorResult.errors.forEach(errorMessage =>
                toast.error(errorMessage)
            )
        }
    }


    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="forgot-pass-ui-container">
                <TitleText text='Recupera tu contraseña' />
                <div className="information-container">
                    <div className="left-container">
                        <img src={padlock} alt="" />
                    </div>
                    <div className="right-container">
                        <SubtitleOne text='¿No recuerdas cuál es tu contraseña?' />
                        <SubtitleOne text={this.textForgot} />
                        <div className="bottom-part">
                            <SubtitleOne text='usuario' />
                            <InputText
                                placeholder='user@domain.com'
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            <NavLink to="/login/" className="navlink">
                                <SubtitleOne text='¿La recordaste? Inicia Sesión' />
                            </NavLink>
                            <MainButton text={'Recuperar'} onClick={this.handleResetPassword} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(ForgotPassword)
