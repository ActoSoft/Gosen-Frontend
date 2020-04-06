import React from 'react'

const ProductImages = ({ data }) => {
    return(
        <div className="product-images-container">
            <p className="images-title">Imágenes del producto</p>
            { data && data.length > 0 ?
                <div className="container">
                    {
                        data.map(({ image, id }) => 
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

export default ProductImages