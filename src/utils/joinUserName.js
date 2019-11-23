import { validateExist } from './'

const joinUserData = (user) =>
    user.first_name && user.last_name ?
        `${validateExist(user.first_name)} ${validateExist(user.last_name)}`
        : ''

export default joinUserData