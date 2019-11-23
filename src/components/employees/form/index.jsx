import React, { Component } from 'react'
import { employeesEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import FormReusable from '../../reusables/form'
import CRUD, { post } from '../../../services'
import ContractForm from './contractForm'
import moment from 'moment'
import { withAuth } from '../../../Authentication'

class EmployeeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            model: 'Empleado'
        }
        this.adminId = this.props.auth.adminId
    }

    async componentDidMount() {
        if (this.props.match.path.split('/').pop() === 'crear') {
            const data = {
                user: {}
            }
            data.contract_date_start = moment().format('YYYY-MM-DD')
            this.setState({
                isCreate: true,
                data
            })
        } else {
            const id = this.props.match.params.id || null
            if (!id) toast.error('No se especificó el usuario a modificar')
            CRUD.findOne(employeesEndpoint, id)
                .then(({ data }) => {
                    data.contract_date_start = moment().format('YYYY-MM-DD')
                    this.setState({ data })
                })
                .catch(error => {
                    console.log(error)
                    toast.error('Algo falló al traer la información.')
                })
        }
    }

    handleChangeForm = ({ e, intoUser = false }) => {
        const { name, value } = e.target
        const { data } = this.state
        if (intoUser) {
            data.user[name] = value
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

    handleChangeDatePicker = ({ name, moment }) => {
        const dateFormatted = moment.format('YYYY-MM-DD')
        const { data } = this.state
        data[name] = dateFormatted
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
                `${employeesEndpoint}update_image/`,
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
        const { data, isCreate } = this.state
        delete data.photo
        try {
            let response
            if(!data.country) data.country = 'México'
            if(isCreate) {
                data.role = 'empleado'
                data.contracted_by = this.adminId
                response = await CRUD.create(employeesEndpoint, data)
            } else {
                //Remove contracted_by in put request
                delete data.contracted_by
                response = await CRUD.update(employeesEndpoint, data.id, data)
            }
            if (response.data) {
                toast.success('Datos actualizados con éxito')
                isCreate ?
                    this.props.history.push('/empleados/')
                    : this.props.history.push(`/empleados/${data.id}/`)
            } else {
                toast.error('WTF')
            }
        } catch (error) {
            const { data } = error.response
            console.log(data)
            // showErrors(data)
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
        const { isCreate, data, model } = this.state
        return (
            <div className="body-container">
                <div className="profile-container">
                    <FormReusable
                        events={this.handleEvent}
                        isCreate={isCreate}
                        data={data}
                        model={model}
                        goBack='/empleados/'
                        notProfileContainer={true}
                    />
                    <ContractForm
                        events={this.handleEvent}
                        data={data}
                    />
                </div>
            </div>
        )
    }
}

export default withAuth(EmployeeForm)