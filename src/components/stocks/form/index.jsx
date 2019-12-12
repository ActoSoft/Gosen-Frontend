import React, { Component } from 'react'
import { stocksEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import Form from './form'
import CRUD, { post } from '../../../services'
// import UploadImages from './uploadImages'
// import './index.scss'

class StockForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            isProductsVisible: false,
            model: 'Almacén',
            products: [],
            newStockId: 0
        }
    }

    async componentDidMount() {
        if (this.props.match.path.split('/').pop() === 'crear') {
            const data = {}
            this.setState({
                isCreate: true,
                data
            })
        } else {
            const id = this.props.match.params.id || null
            if (!id) toast.error('No se especificó el almacén a modificar')
            CRUD.findOne(stocksEndpoint, id)
                .then(({ data }) => {
                    const { products } = data
                    this.setState({
                        data,
                        products,
                        newStockId: data.id
                    })
                })
                .catch(error => {
                    console.log(error)
                    toast.error('Algo falló al traer la información.')
                })
        }
    }

    handleChangeForm = ({ e }) => {
        const { name, value } = e.target
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }


    handleChangeSelect = ({ name, value }) => {
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }


    handleDataSubmit = async () => {
        // TODO: Validations
        const { data, isCreate } = this.state
        try {
            let response
            if(isCreate) {
                response = await CRUD.create(stocksEndpoint, data)
            } else {
                delete data.works
                response = await CRUD.update(stocksEndpoint, data.id, data)
            }
            if (response.data) {
                toast.success('Almacén creado con éxito')
                this.setState({
                    isProductsVisible: true,
                    newStockId: response.data.id
                })
            } else {
                toast.error('WTF')
            }
        } catch (error) {
            const { data } = error.response
            console.log(data)
            // showErrors(data)
        }
    }

    handleEvent = (event, params) => {
        const events = {
            handleChange: this.handleChangeForm,
            handleChangeSelect: this.handleChangeSelect,
            handleSubmit: this.handleDataSubmit
        }
        return events[event](params)
    }

    finishCreateStock = () => {
        this.props.history.push(`/almacenes/${this.state.newStockId}`)
    }

    render() {
        const {
            isCreate,
            isProductsVisible,
            data,
            model,
            // products,
            // newStockId
        } = this.state
        console.log(model)
        return (
            <div className="body-container">
                <Form
                    isVisible={!isProductsVisible}
                    events={this.handleEvent}
                    isCreate={isCreate}
                    data={data}
                    model={model}
                    goBack='/almacenes/'
                />
                {/* <UploadProducts
                    isProductsVisible={isProductsVisible}
                    products={products}
                    endpoint={stocksEndpoint}
                    productId={newStockId}
                    handleUploadImage={this.handleUploadImage}
                    simulateClick={this.handleSimulateClick}
                    handleDeleteImage={this.handleDeleteImage}
                    finishCreateStock={this.finishCreateStock}
                /> */}
            </div>
        )
    }
}

export default StockForm