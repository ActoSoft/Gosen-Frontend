const validateImageOnItem = item => 
    item.images && item.images.length > 0 ?
        item.images[0].image
        : null

export default validateImageOnItem