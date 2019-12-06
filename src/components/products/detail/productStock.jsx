import React, { Fragment } from 'react'


const ProductStock = ({
    firstStock,
    lastStock,
    handleMoveStocks,
    data,
    isLeftArrowStockShow,
    isRightArrowStockShow
}) => 
    <Fragment>
        {data && data.length > 0 ?
            <div className="stocks-container">
                <p className="stocks-title">Almacenes</p>
                <div className="product-stocks-container">
                    {
                        isLeftArrowStockShow() ? 
                            <p className="arrow" onClick={() => handleMoveStocks('left')}>{'<'}</p>
                            : null
                    }
                    {
                        data.slice(firstStock, lastStock + 1).map(stock =>
                            <div className="card-container" key = {stock}>
                                <p className="name">{stock.stock.name}</p>
                                <p>{`Cantidad ${stock.qty} pzas.`}</p>                            
                            </div>
                        )
                    }
                    {
                        isRightArrowStockShow() ?
                            <p className="arrow" onClick={() => handleMoveStocks('right')}>{'>'}</p>
                            : null
                    }
                </div>
            </div>
            : null
        }
    </Fragment>

export default ProductStock
