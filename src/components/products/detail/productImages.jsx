import React, { Component } from 'react'

export default class ProductImages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstIndex: 0,
            lastIndex: 3
        }
    }

    // componentDidMount() {
    //     if(this.props.data) {
    //         this.renderItem(this.state.actualIndex)
    //     }
    // }

    // renderItem = (position) => {
    //     const { data } = this.props
    //     const length = data.length
    //     if (position < 0) position = length - 1
    //     if (position === length) position = 0
    //     this.setState({
    //         actualIndex: position,
    //         actualItem: data[position]
    //     })
    // }

    render() {
        const { data } = this.props
        const { firstIndex, lastIndex } = this.state

        return(
            <div className="product-images-container">
                <p className="images-title">Imágenes del producto</p>
                { data && data.length > 0 ?
                    <div className="container">
                        {
                            data.slice(firstIndex, lastIndex).map(({image, id}) => 
                                <img
                                    className="product-image-img"
                                    key={id}
                                    src={image}
                                    alt={id}
                                />
                            )
                        }
                    </div>
                    : 
                    <p className="no-images-product">No se han agregado imágenes del producto</p>
                }
            </div>
        )
    }
}