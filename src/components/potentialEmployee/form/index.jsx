import React, { Component } from 'react'
import { potentialEmployeesEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import FormReusable from './FormComponent'
// import './index.scss'
import CRUD, { post } from '../../../services'
import moment from 'moment'

class PotentialEmployeeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: true,
            isContracted: false,
            model: 'Postulantes',
            isReady: false
        }
    }

    async componentDidMount() {
        const data = {
            user: {
                first_name: null,
                last_name: null,
                username: null,
                email: null
            },
            birth_date: '1990-01-01',
            phone_number: null,
            street: null,
            city: null,
            zip_code: null,
            gender: null,
            state: null,
            role: null
        }
        this.setState({
            isReady: true,
            data
        })
    }

    generateUsername = (firstName, lastName) => {
        return `${firstName.replace(' ', '_').toLowerCase()}_${lastName.replace(' ', '_').toLowerCase()}`
    }

    handleChangeForm = ({ e, intoUser = false }) => {
        const { name, value } = e.target
        const { data } = this.state
        if (intoUser) {
            data.user[name] = value
            if (data.user.first_name && data.user.last_name) {
                data.user.username = this.generateUsername(data.user.first_name, data.user.last_name)
            }
            this.setState({ data })
        } else {
            data[name] = value
            this.setState({ data })
        }
    }

    // handleChangeImage = async ({ file }) => {
    //     const result = await this.handleSubmitImage(file)
    //     if (!result.hasError) {
    //         const { data } = this.state
    //         data.photo = result
    //         this.setState({
    //             data
    //         })
    //     }
    // }

    handleChangeDatePicker = ({ moment: momentDate }) => {

        if(!momentDate) return false

        const dateFormatted = momentDate.format('YYYY-MM-DD')
        const { data } = this.state
        data.birth_date = dateFormatted
        this.setState({ data })
    }

    handleChangeSelect = ({ name, value }) => {
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }

    // handleSubmitImage = async (image) => {
    //     let formData = new FormData()
    //     formData.append('photo', image)
    //     formData.append('id', this.state.data.id)
    //     try {
    //         const response = await post(
    //             `${potentialEmployeesEndpoint}update_image/`,
    //             formData
    //         )
    //         if(response.data) {
    //             toast.success('Imagen actualizada con éxito')
    //             return response.data.photo
    //         } else {
    //             toast.warn('WTF')
    //             return {
    //                 hasError: true
    //             }
    //         }
    //     } catch (error) {
    //         // showErrors(error.response.data)
    //         console.log(error.response.data)
    //         return {
    //             hasError: true
    //         }
    //     }
    // }

    handleValidation = async (data) => {

        const { user } = data
        let hasError = false

        await Object.keys(user).map(attr => {

            let name

            switch (attr) {
                case 'first_name':
                    name = 'Nombre'
                    break;
                case 'last_name':
                    name = 'Apellido'
                    break;
                case 'username':
                    name = 'Usuario'
                    break;
                case 'email':
                    name = 'Correo electrónico'
                    break;
                default:
                    break;
            }

            if(!user[attr] || user[attr].length < 2) {
                toast.error(`Por favor llena el siguiente campo: ${name}`)
                hasError = true
            }
        })

        await Object.keys(data).map(attr => {

            let name
            if(attr === 'user') return false

            switch (attr) {
                case 'birth_date':
                    name = 'Fecha de Nacimiento'
                    break;
                case 'phone_number':
                    name = 'Teléfono'
                    break;
                case 'street':
                    name = 'Calle'
                    break;
                case 'city':
                    name = 'Ciudad'
                    break;
                case 'zip_code':
                    name = 'Código postal'
                    break;
                case 'gender':
                    name = 'Género'
                    break;
                case 'state':
                    name = 'Estado'
                    break;
                case 'role':
                    name = 'Tipo de Empleado'
                    break;
                default:
                    break;
            }

            if(!data[attr] || data[attr].length < 2) {
                toast.error(`Por favor llena el siguiente campo: ${name}`)
                hasError = true
            }
        })

        return hasError
    }

    handleSubmit = async () => {
        // TODO: Validations
        const { data } = this.state
        delete data.photo

        const validation = await this.handleValidation(data)

        if(!validation) {
            const now  = moment()
            const momentBirth = moment(data.birth_date)
            const yearsOld = now.diff(momentBirth, 'years')
            if (yearsOld < 21 || yearsOld > 50) {
                toast.warn('Sólo pueden aplicar personas entre los 21 y 50 años. Lo sentimos.')
            } else {
                try {
                    if (!data.country) data.country = 'México'
                    data.user.username += '_potential'
                    const response = await CRUD.create(potentialEmployeesEndpoint, data)
                    if (response.data) {
                        toast.success('Se ha registrado tu postulación')
                        window.location.reload()
                    } else {
                        toast.error('Algo falló al enviar la información, intenta más  tarde')
                    }
                } catch (error) {
                    const { data } = error.response
                    console.log(data)
                    // showErrors(data)
                }
            }
        }
    }

    handleEvent = (event, params) => {
        const events = {
            handleChange: this.handleChangeForm,
            handleChangeDate: this.handleChangeDatePicker,
            handleChangeSelect: this.handleChangeSelect,
            // handleChangeImage: this.handleChangeImage,
            handleSubmit: this.handleSubmit
        }
        return events[event](params)
    }

    render() {
        const { isCreate, data, model, isReady } = this.state
        return (
            <div className="body-container">
                <FormReusable
                    events={this.handleEvent}
                    isCreate={isCreate}
                    isReady={isReady}
                    data={data}
                    model={model}
                    goBack='/'
                />
            </div>
        )
    }
}

export default PotentialEmployeeForm