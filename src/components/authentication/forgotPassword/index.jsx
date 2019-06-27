import React, { Component } from 'react'
import './index.scss'
import padlock from '../../../assets/icons/padlock.svg'
import MainButton from '../../common/mainButton'
import TitleText from '../../common/titleText'
import SubtitleOne from '../../common/subtitleOne'
import InputText from '../../common/inputText'
import { NavLink } from 'react-router-dom';

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textForgot:
				'No te preocupes.\nIngresa el correo electrónico que tienes ligado a tu cuenta y en unos minutos recibirás un correo electrónico con los pasos necesarios para que puedas recuperarla 😉'
		}
	}

	render() {
		return (
			<div className="forgot-pass-ui-container">
				<TitleText text={'Recupera tu contraseña'} />
				<div className="information-container">
					<div className="left-container">
						<img src={padlock} alt="" />
					</div>
					<div className="right-container">
						<SubtitleOne text={'¿No recuerdas cuál es tu contraseña?'} />
						<SubtitleOne text={this.state.textForgot} />
						<div className="bottom-part">
							<SubtitleOne text={'usuario'} />
							<InputText placeholder={'user@domain.com'} />
							<NavLink to="/login/" className="navlink">
								<SubtitleOne text='¿La recordaste? Inicia Sesión' />
							</NavLink>
							<MainButton text={'Recuperar'} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ForgotPassword;
