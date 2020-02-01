import React, { Fragment } from 'react'
import { Icon, Row, Col } from 'antd'
import MainButton from '../../common/mainButton'
import './index.scss'
import { formatURL } from '../../../utils'

const UploadImages = ({
    images,
    isImagesVisible,
    handleUploadImage,
    simulateClick,
    handleDeleteImage,
    handleSetStocks
}) =>
    <Fragment>
        {isImagesVisible ?
            <div className='profile-container service-container'>
                <div className="header-container services">
                    <div className="header-text-container-update">
                        <p className="label-images-create">Agrega imágenes del producto</p>
                    </div>
                    <div className="buttons-service-form">
                        <MainButton
                            text='Continuar'
                            className="edit-buttons"
                            onClick={() => handleSetStocks()}
                        />
                    </div>
                </div>

                <div className="images-uploaded-container">
                    {
                        images && images.length > 0 ?
                            <Row className="create-product-images-container">
                                {
                                    images.map(image =>
                                        <ImageItem
                                            key={image.id}
                                            src={image.image}
                                            id={image.id}
                                            handleDeleteImage={handleDeleteImage}
                                        />
                                    )}
                            </Row>
                            : <p className="no-images">Aún no has subido imágenes</p>
                    }
                </div>
                <div className="upload-button-container" onClick={simulateClick}>
                    <div className="upload-button-image">
                        <Icon type="plus" className="upload-button-image-icon" />
                        <div className="upload-button-image-text">Cargar imagen</div>
                        <input
                            type="file"
                            id="input-file-upload-image"
                            style={{display: 'none'}}
                            onChange={(e) => handleUploadImage(e)}
                        />
                    </div>
                </div>
            </div>
            : null
        }
    </Fragment>


const ImageItem = ({src, id, handleDeleteImage }) =>
    <Col className="create-product-images-container" span={6}>
        <div className="image-item-src">
            <img src={formatURL(src)} alt="Imagencita"/>
        </div>
        <Icon
            className="icon-delete-image"
            type="close"
            onClick={() => handleDeleteImage(id)}
        />
    </Col>

export default UploadImages
