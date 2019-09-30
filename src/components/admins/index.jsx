import React, { Component } from 'react'
import './index.scss'
import Navbar from '../common/navbar'
import ProfileCard from './profileCard'
import Footer from '../common/footer'
import { withAuth } from '../../Authentication'

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

    render() {
        return (
            <div className="profile-component-container">
                <div className="navbar-container">
                    <Navbar />
                </div>
                <div className="body-container">
                    <div>
                        <ProfileCard data={this.state.data} />
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