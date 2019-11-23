import React, { Component } from 'react'
import { servicesEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import Form from './form'
import CRUD from '../../../services'
import './index.scss'

class ServiceForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            model: 'Servicio'
        }
    }

    async componentDidMount() {
        if (this.props.match.path.split('/').pop() === 'crear') {
            const data = {
                user: {}
            }
            this.setState({
                isCreate: true,
                data
            })
        } else {
            const id = this.props.match.params.id || null
            if (!id) toast.error('No se especificó el servicio a modificar')
            CRUD.findOne(servicesEndpoint, id)
                .then(({ data }) => {
                    this.setState({ data })
                })
                .catch(error => {
                    console.log(error)
                    toast.error('Algo falló al traer la información.')
                })
        }
    }

    handleChangeForm = ({ e }) => {
        const { name, value } = e.target
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }


    handleChangeSelect = ({ name, value }) => {
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }

    handleSubmit = async () => {
        // TODO: Validations
        const { data, isCreate } = this.state
        try {
            let response
            if(isCreate) {
                response = await CRUD.create(servicesEndpoint, data)
            } else {
                delete data.works
                response = await CRUD.update(servicesEndpoint, data.id, data)
            }
            if (response.data) {
                toast.success('Datos actualizados con éxito')
                isCreate ?
                    this.props.history.push('/servicios/')
                    : this.props.history.push(`/servicios/${data.id}/`)
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
                <Form
                    events={this.handleEvent}
                    isCreate={isCreate}
                    data={data}
                    model={model}
                    goBack='/servicios/'
                />
            </div>
        )
    }
}

export default ServiceForm