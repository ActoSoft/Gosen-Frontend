import React, { Component } from 'react'
import './index.scss'
import DashboardBody from './dashboardBody'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="dashboard-container">
                <body>
                    <DashboardBody />
                </body>
            </div>
        )
    }
}

export default Dashboard