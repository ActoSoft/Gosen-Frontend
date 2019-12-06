import React, { Component, Fragment } from 'react'
import { Skeleton } from 'antd'
import CRUD from '../../../services'
import { productsEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify' 
import CardList from '../../reusables/cardList'

export default class ProductList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            data: null
        }
    }

    componentDidMount = async () => {
        try {
            const response = await CRUD.findAll(productsEndpoint)
            const { data } = response
            if (data) {
                this.setState({
                    data,
                    isReady: true
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Algo falló al traer la información')
        }
    }

    handleDelete = id => {
        if(window.confirm('¿Deseas realmente eliminar este producto?')) {
            CRUD.softDelete(productsEndpoint, id)
                .then(response => {
                    console.log(response.data)
                    toast.success('El producto ha sido eliminado')
                    setTimeout(() => this.props.history.push('/productos/'), 3000)
                })
                .catch(error => {
                    console.log(error.response)
                    toast.error('Algo fallo al eliminar')
                })
        }
    }

    render() {
        const { isReady, data } = this.state
        return (
            <Fragment>
                {isReady ?
                    <CardList
                        data={data}
                        title='Productos'
                        URL='/productos'
                        history={this.props.history}
                        handleDelete={this.handleDelete}
                        
                    />
                    :
                    <Skeleton active={true} />
                }
            </Fragment>
        )
    }
}