import { toast } from 'react-toastify'

const showErrors = (errors) => {
    Object.keys(errors).forEach(error =>
        toast.error(`${error}: ${errors[error]}`)
    )
}

export default showErrors