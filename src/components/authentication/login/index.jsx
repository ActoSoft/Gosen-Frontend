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
import { NavLink } from 'react-router-dom'
import { withAuth } from '../../../Authentication'

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
			const newState = { ...prevState };
			newState[name] = value;
			return newState
		})
	}

	onLogin = async () => {
		if (await this.login(this.state)) {
			this.props.history.push('/dashboard/')
		}
	}

	render() {
		return (
			<div className="login-ui-container">
				<div className="left-container">
					<TitleText text={`Iniciar sesión`} />
					<div className="form-part">
						<SubtitleTwo text={'Usuario'} />
						<InputText className="inputs-login" name="username" onChange={this.onChangeForm} />
						<SubtitleTwo text={'Contraseña'} />
						<InputPassword className="inputs-login" name="password" onChange={this.onChangeForm} />
						<NavLink to="/recuperar-contraseña/" className="navlink">
							<SubtitleOne text="¿Olvidaste tu contraseña?" />
							</NavLink>
						<MainButton text={`Iniciar Sesión`} onClick={this.onLogin} />
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

export default withAuth(Login)
