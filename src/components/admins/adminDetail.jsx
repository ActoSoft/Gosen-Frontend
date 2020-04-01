import React, { Component, Fragment } from 'react'
import { adminsEndpoint } from '../../utils/backendEndpoints'
import axios from 'axios'
import { toast } from 'react-toastify'
import DetailReusable from '../reusables/detail'
import CRUD from '../../services'
import { withAuth } from '../../Authentication'

class AdminDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false
        }
        this.adminId = this.props.match.params.id
        this.isStaff = this.props.auth.isStaff
    }

    componentDidMount() {
        axios.get(`${adminsEndpoint}${this.adminId}`)
            .then(response => this.setState({data: response.data, isReady: true}))
            .catch(error => console.log(error))
    }

    handleDelete = () => {
        CRUD.softDelete(adminsEndpoint, this.adminId)
            .then(() => {
                toast.success('El administrador ha sido eliminado')
                setTimeout(() => this.props.history.push('/administradores/'), 3000)
            })
            .catch(error => {
                console.log(error.response)
                toast.error('Algo fallo al eliminar')
            })
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
                            handleDelete={this.handleDelete}
                            isStaff={this.isStaff}
                            isAdmin={true}
                        />
                        : null
                    }
                </div>
            </Fragment>
        )
    }
}

export default withAuth(AdminDetail)