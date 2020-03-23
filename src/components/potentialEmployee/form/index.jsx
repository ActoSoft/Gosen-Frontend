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
            user: {}
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

    handleChangeImage = async ({ file }) => {
        const result = await this.handleSubmitImage(file)
        if (!result.hasError) {
            const { data } = this.state
            data.photo = result
            this.setState({
                data
            })
        }
    }

    handleChangeDatePicker = ({ moment: momentDate }) => {
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

    handleSubmitImage = async (image) => {
        let formData = new FormData()
        formData.append('photo', image)
        formData.append('id', this.state.data.id)
        try {
            const response = await post(
                `${potentialEmployeesEndpoint}update_image/`,
                formData
            )
            if(response.data) {
                toast.success('Imagen actualizada con éxito')
                return response.data.photo
            } else {
                toast.warn('WTF')
                return {
                    hasError: true
                }
            }
        } catch (error) {
            // showErrors(error.response.data)
            console.log(error.response.data)
            return {
                hasError: true
            }
        }
    }

    handleSubmit = async () => {
        // TODO: Validations
        const { data } = this.state
        delete data.photo

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

    handleEvent = (event, params) => {
        const events = {
            handleChange: this.handleChangeForm,
            handleChangeDate: this.handleChangeDatePicker,
            handleChangeSelect: this.handleChangeSelect,
            handleChangeImage: this.handleChangeImage,
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