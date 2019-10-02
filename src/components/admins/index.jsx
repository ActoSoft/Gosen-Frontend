import React, { Component } from 'react'
import './index.scss'
import Navbar from '../common/navbar'
import ProfileCard from './profileCard'
import Footer from '../common/footer'
import { withAuth } from '../../Authentication'
import ProfileForm from './profileUpdate'


class Profile extends Component {
    constructor(props) {
        console.log('llego')
        super(props)
        this.state = {
            isUploadedImage: false
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

    handleChangeForm = ({e, intoUser = false}) => {

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

    handleChangeImage =({file}) => {
        console.log(file)
        const { data } = this.state
        data.photo = file
        this.setState({
            data,
            isUploadedImage: true,
            temporalImage: URL.createObjectURL(file)
        })
    }

    handleChangeDatePicker = ({moment}) => {
        const dateFormatted = moment.format('YYYY-MM-DD')
        const { data } = this.state
        data.birth_date = dateFormatted
        this.setState({ data })
    }

    handleChangeSelect = ({name, value}) => {
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }

    handleEvent = (event, params) => {
        const events = {
            handleChange: this.handleChangeForm,
            handleChangeDate: this.handleChangeDatePicker,
            handleChangeSelect: this.handleChangeSelect,
            handleChangeImage: this.handleChangeImage
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
                                isUploadedImage={this.state.isUploadedImage}
                                temporalImage={this.state.temporalImage}
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