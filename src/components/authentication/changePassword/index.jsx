import React, { Component } from 'react'
import './index.scss'
import check from  '../../../assets/icons/check.svg'
import TitleText from '../../common/titleText'
import SubtitleOne from '../../common/subtitleOne'
import InputPassword from '../../common/inputPassword'
import MainButton from '../../common/mainButton'
import { withAuth } from '../../../Authentication/'
import { toast } from 'react-toastify'

class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            password: '',
            confirmPassword: '',
            token: this.props.match.params.token
        }
        this.changePassword = this.props.auth.handleResetPasswordConfirm
    }

    handleChange = e =>{
        const { name, value } = e.target
        this.setState(prevState => {
			const newState = { ...prevState };
			newState[name] = value;
			return newState
		})
    }

    equatePassword = async () => {

        const { password, confirmPassword, token } = this.state
        console.log(confirmPassword)
        if(password === confirmPassword) {
            await this.changePassword({ password, token })
            toast.success('Las contraseña se ha actualizado correctamente')
            setTimeout(()=>this.props.history.push('/login/'), 3000)
        } else {
            toast.error('Revisa las contraseñas, no son iguales')
        }
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
                         onChange={this.handleChange}
                         placeholder = { "contraseña" }
                         name="confirmPassword"
                        />

                        <MainButton
                         text = { "Cambiar contraseña" }
                         onClick={this.equatePassword}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(ChangePassword)