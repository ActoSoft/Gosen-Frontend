const formatCosts = (value, currency = 'MXN') => 
    `$${parseFloat(value).toFixed(2)} ${currency}`

export default formatCosts