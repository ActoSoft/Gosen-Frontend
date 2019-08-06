import axios from 'axios'
import { toast } from 'react-toastify'
import {
    loginEndpoint,
    resetPasswordEndpoint,
    recoverPasswordEndpoint
} from '../backendEndpoints'
class Authentication {

    constructor() {
        this.token = localStorage.getItem('token')
        this.username = localStorage.getItem('username')
        this.email = localStorage.getItem('email')
        this.firstName = localStorage.getItem('firstName')
        this.lastName = localStorage.getItem('lastName')
        this.adminId = localStorage.getItem('adminId')
        this.userId = localStorage.getItem('userId')
        this.API_URL = process.env.REACT_APP_API_URL
    }

    isAuthenticated = () => {
        if (this.token) {
            return true
        }
        return false
    }

    getFullName = () => {
        return `${this.firstName ? this.firstName : 'Nombre'} ${this.lastName ? this.lastName : 'Apellidos'}`
    }

    handleLogin = async (data) => {
        try {
            let response = await axios.post(loginEndpoint, data)
            if (response.data) {
                const { token, profile } = response.data
                const { username, email, first_name, last_name, id } = profile.user
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                localStorage.setItem('email', email)
                localStorage.setItem('firstName', first_name)
                localStorage.setItem('lastName', last_name)
                localStorage.setItem('userId', id)
                localStorage.setItem('adminId', profile.id)
                toast.success('Has iniciado sesión con éxito')
                return true
            }
            else {
                toast.error('Algo falló al iniciar sesión')
                return false
            }
        } catch (error) {
            console.log(error)
            toast.error('Algo falló al iniciar sesión')
            return false
        }
    }

    handleResetPassword = async (data) => {
        try {
            const response = await axios.post(resetPasswordEndpoint, data)
            if (response.data) {
                toast.success('Se ha enviado un correo electrónico con las instrucciones')
                console.log(data)
            }
        } catch (error) {
            console.log(error)
            toast.error('Ups, ha ocurrido un error')
        }
    }

    handleResetPasswordConfirm = async (data) =>{
        try {
            const response = await axios.post(recoverPasswordEndpoint, data)
            if(response.data){
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default Authentication