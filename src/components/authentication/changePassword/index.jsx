import React, { Component } from 'react'
import './index.scss'
import check from  '../../../assets/icons/check.svg'
import TitleText from '../../common/titleText'
import SubtitleOne from '../../common/subtitleOne'
import InputPassword from '../../common/inputPassword'
import MainButton from '../../common/mainButton'
import { withAuth } from '../../../Authentication/'
import { toast } from 'react-toastify'
import { validateRequest } from '../../../validators'

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

    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevState => {
            const newState = { ...prevState }
            newState[name] = value
            return newState
        })
    }

    equatePassword = async () => {

        const { password, confirmPassword, token } = this.state
        if(password === confirmPassword) {
            const data = { password, token }
            const validatorResult = await validateRequest('resetPassword', data)
            if (!validatorResult.error) {
                await this.changePassword(data)
                setTimeout(()=>this.props.history.push('/login/'), 3000)
            } else {
                validatorResult.errors.forEach(errorMessage =>
                    toast.error(errorMessage)
                )
            }
        } else {
            toast.error('Revisa las contraseñas, no son iguales')
        }
    }

    render(){
        return(
            <div className="confirm-pass-container">
                <TitleText text='Crea tu nueva contraseña' />
                <div className="info-container">
                    <div className="left-container">
                        <img src={ check } alt="check" />
                    </div>
                    <div className="right-container">
                        <SubtitleOne text='Nueva contraseña' />
                        <InputPassword
                            placeholder='contraseña'
                            name="password"
                            onChange={this.handleChange}
                        />

                        <SubtitleOne text='Confirmar tu nueva contraseña' />
                        <InputPassword
                            onChange={this.handleChange}
                            placeholder='contraseña'
                            name="confirmPassword"
                        />

                        <MainButton
                            text='Cambiar contraseña'
                            onClick={this.equatePassword}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(ChangePassword)