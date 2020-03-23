import React, { Component, Fragment } from 'react'
import CRUD from '../../../services'
import { worksEndpoint } from '../../../utils/backendEndpoints'
import ReusableList from '../../reusables/list'
import { Skeleton } from 'antd'
import { deconstructInfo, joinUserName, formatCosts } from '../../../utils'
import { getWorkStatus } from '../../../consts'
export default class WorksList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'Servicio',
                    name: 'serviceName'
                },
                {
                    title: 'Cliente',
                    name: 'fullName'
                },
                {
                    title: 'Status',
                    name: 'status'
                },
                {
                    title: 'Total $',
                    name: 'total'
                }
            ]
        }
    }

    componentDidMount = async () => {
        const response = await CRUD.findAll(worksEndpoint)
        if(response.data) {
            const data = response.data.map(work => {
                const userWithOutDeconstruct = work.client.user
                const user = deconstructInfo(work.client)
                delete work.client
                const userData = deconstructInfo(work)
                const mainData = {
                    ...user,
                    ...userData
                }
                mainData.fullName = joinUserName(userWithOutDeconstruct)
                mainData.status = getWorkStatus(mainData.status)
                mainData.total = formatCosts(mainData.total)
                return mainData
            })
            this.setState({ data, isReady: true })
        }
    }


    render() {
        const { columns, data, isReady } = this.state
        return (
            <Fragment>
                {isReady ?
                    <ReusableList
                        columns={columns}
                        data={data}
                        title='Trabajos'
                        URL='/trabajos'
                        history={this.props.history}
                    />
                    :
                    <Skeleton active={true} />
                }
            </Fragment>
        )
    }

}