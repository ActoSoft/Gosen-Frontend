import React, { Component, Fragment } from 'react'
import { adminsEndpoint } from '../../utils/backendEndpoints'
import axios from 'axios'
// import { toast } from 'react-toastify'
// import { showErrors } from '../../utils'
import DetailReusable from '../reusables/detail'

class AdminDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false
        }
        this.adminId = this.props.match.params.id
    }

    componentDidMount() {
        axios.get(`${adminsEndpoint}${this.adminId}`)
            .then(response => this.setState({data: response.data, isReady: true}))
            .catch(error => console.log(error))
    }

    render() {
        const { data, isReady } = this.state
        const { pathname } = this.props.location
        return (
            <Fragment>
                <div className="body-container">
                    {isReady ?
                        <DetailReusable
                            data={data}
                            editURL={pathname}
                        />
                        : null
                    }
                </div>
            </Fragment>
        )
    }
}

export default AdminDetail