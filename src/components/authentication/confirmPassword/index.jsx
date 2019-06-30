import React, { Component } from 'react'
import './index.scss'
import check from  '../../../assets/icons/check.svg'
import TitleText from '../../common/titleText'
import SubtitleOne from '../../common/subtitleOne'
import InputPassword from '../../common/inputPassword'
import MainButton from '../../common/mainButton'

class ConfirmPassword extends Component{
    constructor(props){
        super(props)
        this.state = {

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
                        <InputPassword placeholder = { "contraseña" } />
                        <SubtitleOne text = { "Confirmar tu nueva contraseña" } />
                        <InputPassword placeholder = { "contraseña" } />
                        <MainButton text = { "Guardar" } />
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmPassword