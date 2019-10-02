const API_URL = process.env.REACT_APP_API_URL

const formatURL = (path) => {
    if (!path.startsWith('http')) {
        if (path.startsWith('/')) return `${API_URL}${path}`
        else return `${API_URL}/${path}`
    }
    return path
}

export default formatURL