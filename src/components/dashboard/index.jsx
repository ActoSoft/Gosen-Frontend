import React, {Component} from 'react'
import './index.scss'
import DashboardBody from './dashboardBody'
import Navbar from '../common/navbar'

class Dashboard extends Component {
    constructor(props) {
        super(props)
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
            </div>
        )
    }
}

export default Dashboard