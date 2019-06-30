import React, { Component } from 'react'
import './index.scss'
import check from  '../../../assets/icons/check.svg'
import TitleText from '../../common/titleText'
import SubtitleOne from '../../common/subtitleOne'
import InputPassword from '../../common/inputPassword'
import MainButton from '../../common/mainButton'
import { withAuth } from '../../../Authentication/'

class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            password: '',
            token: this.props.match.params.token
        }
        this.changePassword = this.props.auth.handleResetPasswordConfirm
    }

    handleChange = ( e ) =>{
        const { name, value } = e.target
        this.setState(prevState => {
			const newState = { ...prevState };
			newState[name] = value;
			return newState
		})
    }

    equatePassword = () => {
        const { password } = this.state
        const confirm_pass_value = document.getElementsByName('confirmPassword').value

        password === confirm_pass_value
        ? this.changePassword(this.state)
        : alert('Los valores no coinsiden')
    }

    render(){
        return(
            <div className="confirm-pass-container">
                <TitleText text = { "Crea tu nueva contraseña" } />
                <div className="info-container">
                    <div className="left-container">
                        <img src={ check } alt="check" />
                    </div>
                    <div className="right-container">
                        <SubtitleOne text = { "Nueva contraseña" } />
                        <InputPassword
                         placeholder = { "contraseña" }
                         name="password"
                         onChange={this.handleChange}
                        />

                        <SubtitleOne text = { "Confirmar tu nueva contraseña" } />
                        <InputPassword 
                         placeholder = { "contraseña" }
                         name="confirmPassword"
                        />

                        <MainButton 
                         text = { "Guardar" } 
                         onClick={(e) =>this.equatePassword}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(ChangePassword)