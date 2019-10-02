import React, { Component } from 'react'
import './index.scss'
import Navbar from '../common/navbar'
import ProfileCard from './profileCard'
import Footer from '../common/footer'
import { withAuth } from '../../Authentication'
import ProfileForm from './profileUpdate'
import { adminsEndpoint } from '../../backendEndpoints'
import axios from 'axios'
import { toast } from 'react-toastify'
import { showErrors } from '../../utils'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.getData = this.props.auth.handleGetUserData
    }

    componentDidMount() {
        this.getData().then(data =>
            this.setState({
                data
            })
        )
    }

    handleDeleteAdmin = async () => {
        const { data } = this.state
        try{
            const response = await axios.delete(`${adminsEndpoint}${data.id}`)
            if(response.data.message === 'ok')
                toast.success('Administrador eliminado con éxito')
            else
                toast.error('Algo falló')
        } catch(error) {
            const { data } = error.response
            showErrors(data)
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
            const response = await axios.post(
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
            showErrors(error)
            return {
                hasError: true
            }
        }
    }

    handleSubmit = async () => {
        // TODO: Validations
        const { data } = this.state
        delete data.photo
        try {
            const response = await axios.put(`${adminsEndpoint}${data.id}/`, data)
            if (response.data) {
                toast.success('Datos actualizados con éxito')
                this.props.history.push('/perfil/')
            } else {
                toast.error('WTF')
            }
        } catch (error) {
            const { data } = error.response
            showErrors(data)
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
        return (
            <div className="profile-component-container">
                <div className="navbar-container">
                    <Navbar />
                </div>
                <div className="body-container">
                    <div>
                        {this.props.action === 'detail' ?
                            <ProfileCard data={this.state.data} />
                            : null
                        }
                        {this.props.action === 'update' ?
                            <ProfileForm
                                data={this.state.data}
                                events={this.handleEvent}
                            />
                            : null
                        }
                    </div>
                </div>
                <div className="footer-container">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default withAuth(Profile)