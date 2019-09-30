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

    render() {
        console.log(this.props)
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
                            <ProfileForm data={this.state.data} />
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