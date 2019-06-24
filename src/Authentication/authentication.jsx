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

}

export default Authentication