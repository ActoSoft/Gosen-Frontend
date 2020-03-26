import { toast } from 'react-toastify'

const joiValidator = (schema, data) => {
    const result = schema.validate(data, { abortEarly: false })
    if (result.error) {
        const errors = result.error.details.forEach(detail => {
            console.log(detail.message)
            toast.error(detail.message)
        })
        return { error: true, errors }
    } else {
        return { error: false }
    }
}

export default joiValidator