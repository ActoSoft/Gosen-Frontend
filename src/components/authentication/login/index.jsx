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
import axios from 'axios'

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
	}

	onChangeForm = (e) => {
		const { name, value } = e.target
		console.log(name)
		console.log(value)
		this.setState(prevState => {
			const newState = { ...prevState };
			newState[name] = value;
			return newState
		})
	}

	handleLogin = async () => {
		try {
			let loginRequest = await axios.post('http://localhost:8000/token-auth/', this.state)
			console.log(loginRequest.data)
		} catch (error) {
			console.log('Algo falló')
			console.log(error)
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
						<InputPassword className="inputs-login" name="password" onChange={(e)=>this.onChangeForm(e)} />
						<NavLink to="/recuperar-contraseña/" className="navlink">
							<SubtitleOne text="¿Olvidaste tu contraseña?" />
							</NavLink>
						<MainButton text={`Iniciar Sesión`} onClick={this.handleLogin} />
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
