import { validateExist } from './'

const joinUserData = (user) => {
    return user ? user.first_name && user.last_name ?
        `${validateExist(user.first_name)} ${validateExist(user.last_name)}`
        : '' : null
}

export default joinUserData