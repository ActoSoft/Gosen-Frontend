import axios from 'axios'
import { toast } from 'react-toastify'
class Authentication {

    constructor() {
        this.token = localStorage.getItem('token')
        this.username = localStorage.getItem('username')
        this.email = localStorage.getItem('email')
        this.firstName = localStorage.getItem('first_name')
        this.lastName = localStorage.getItem('last_name')
    }

    isAuthenticated = () => {
        if (this.token) {
            return true
        }
        return false
    }

    getFullName = () => {
        return `${this.firstName ? this.firstName : 'Nombre'} ${this.lastName ? this.firstName : 'Apellidos'}`
    }

    handleLogin = async (data) => {
		try {
            let response = await axios.post('http://localhost:8000/token-auth/', data)
			if (response.data) {
                const { token, user } = response.data
                const { username, email, first_name, last_name, id } = user
				localStorage.setItem('token', token)
				localStorage.setItem('username', username)
				localStorage.setItem('email', email)
				localStorage.setItem('firstName', first_name)
                localStorage.setItem('lastName', last_name)
                localStorage.setItem('userId', id)
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
            let response = axios.post('http://localhost:8000/accounts/password_reset/', data)
            if (response.data) {
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default Authentication