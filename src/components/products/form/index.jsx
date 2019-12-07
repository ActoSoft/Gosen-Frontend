import React, { Component } from 'react'
import { productsEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import Form from './form'
import CRUD, { post } from '../../../services'
import UploadImages from './uploadImages'
// import './index.scss'

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            isImagesVisible: false,
            model: 'Producto',
            images: [],
            stocks: [],
            newProductId: 0
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
            if (!id) toast.error('No se especificó el producto a modificar')
            CRUD.findOne(productsEndpoint, id)
                .then(({ data }) => {
                    this.setState({ data })
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
                response = await CRUD.create(productsEndpoint, data)
            } else {
                delete data.works
                response = await CRUD.update(productsEndpoint, data.id, data)
            }
            if (response.data) {
                toast.success('Producto creado con éxito')
                this.setState({
                    isImagesVisible: true,
                    newProductId: response.data.id
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

    handleUploadImage = async ({target}) => {
        let formData = new FormData()
        formData.append('id', this.state.newProductId)
        formData.append('image', target.files[0])
        try {
            const response = await post(
                `${productsEndpoint}upload_image/`,
                formData
            )

            if(response.data) {
                toast.success('Imagen agregada con éxito')
                this.setState({ images: response.data.images })
            } else {
                toast.error('No se pudo agregar imagen')
            }
        } catch(error) {
            toast.error('No se pudo agregar imagen')
        } 
    }

    handleSimulateClick = () => {
        document.querySelector('#input-file-upload-image').click()
    }

    handleDeleteImage = async (id) => {
        try {
            const response = await post(
                `${productsEndpoint}delete_image/`,
                { id }
            )

            if (response.data) {
                toast.success('Imagen eliminada con éxito')
                this.setState({ images: response.data.images })
            } else {
                toast.error('No se pudo eliminar imagen')
            }
        } catch(error) {
            toast.error('No se pudo eliminar imagen')
        }
    }

    finishCreateProduct = () => {
        this.props.history.push(`/productos/${this.state.newProductId}`)
    }

    render() {
        const {
            isCreate,
            isImagesVisible,
            data,
            model,
            images,
            newProductId            
        } = this.state
        console.log(isImagesVisible)
        return (
            <div className="body-container">
                <Form
                    isVisible={!isImagesVisible}
                    events={this.handleEvent}
                    isCreate={isCreate}
                    data={data}
                    model={model}
                    goBack='/productos/'
                />
                <UploadImages
                    isImagesVisible={isImagesVisible}
                    images={images}
                    endpoint={productsEndpoint}
                    productId={newProductId}
                    handleUploadImage={this.handleUploadImage}
                    simulateClick={this.handleSimulateClick}
                    handleDeleteImage={this.handleDeleteImage}
                    finishCreateProduct={this.finishCreateProduct}
                />
            </div>
        )
    }
}

export default ProductForm