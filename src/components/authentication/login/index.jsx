import React, { Component } from 'react'
import './index.scss'
import GLogo from '../../../assets/icons/gosen_logo.png'
import GName from '../../../assets/icons/gosen_name.png'
import InputText from '../../common/inputText/'
import InputPassword from '../../common/inputPassword/'
import MainButton from '../../common/mainButton/'
import TitleText from '../../common/titleText/'
import SubtitleOne from '../../common/subtitleOne'
import SubtitleTwo from '../../common/subtitleTwo'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div className="login-ui-container">
				<div className="left-container">
					<TitleText text={`Iniciar sesión`} />
					<div className="form-part">
						<SubtitleTwo text={'Usuario'} />
						<InputText className="inputs-login" />
						<SubtitleTwo text={'Contraseña'} />
						<InputPassword className="inputs-login" />
						<SubtitleOne text="¿Olvidaste tu contraseña?" />
						<MainButton text={`Iniciar Sesión`} />
					</div>
				</div>
				<div className="right-container">
					<img src={GLogo} alt="Logo Gosen" />
					<img src={GName} alt="Nombre Gosen" />
				</div>
			</div>
		)
	}
}

export default Login
