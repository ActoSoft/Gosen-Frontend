import React, { Component } from 'react'
import { adminsEndpoint } from '../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import FormReusable from '../reusables/form'
import { showErrors } from '../../utils'
import './index.scss'
import CRUD, { post } from '../../services'
class AdminForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            model: 'Administrador'
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
            if (!id) toast.error('No se especificó el usuario a modificar')
            CRUD.findOne(adminsEndpoint, id)
                .then(({data}) => {
                    this.setState({data})
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

    handleChangeDatePicker = ({ moment }) => {
        console.log(moment)
        const dateFormatted = moment.format('YYYY-MM-DD')
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
                `${adminsEndpoint}update_image/`,
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
            showErrors(error.response.data)
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
            if(isCreate) {
                data.role = 'admin'
                response = await CRUD.create(adminsEndpoint, data)
            } else {
                response = await CRUD.update(adminsEndpoint, data.id, data)
            }
            if (response.data) {
                toast.success('Datos actualizados con éxito')
                this.props.history.push('/administradores/')
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
                <FormReusable
                    events={this.handleEvent}
                    isCreate={isCreate}
                    data={data}
                    model={model}
                />
            </div>
        )
    }
}

export default AdminForm