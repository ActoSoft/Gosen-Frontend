import React, { Component } from 'react'
import './index.scss'
import DashboardBody from './dashboardBody'
import Navbar from '../common/navbar'
import Footer from '../common/footer'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="navbar-container">
                    <Navbar />
                </div>
                <div className="dashboard-container">
                    <body>
                        <DashboardBody />
                    </body>
                </div>
                <footer className="footer-container">
                    <Footer />
                </footer>
            </div>
        )
    }
}

export default Dashboard