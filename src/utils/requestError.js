import { toast } from 'react-toastify'

const showErrors = (errors) => {
    console.log(errors)
    Object.keys(errors).forEach(error =>
        toast.error(`${error}: ${errors[error]}`)
    )
}

export default showErrors