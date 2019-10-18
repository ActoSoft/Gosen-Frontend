/*
THIS FILE CONTAINS ALL THE HTTP METHODS USING axios
*/
import axios from 'axios'
import { toast } from 'react-toastify'


axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (!config.hasOwnProperty('isNotIntercepted') && token) {
        config.headers['Authorization'] = `JWT ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})
export const get = (url, config = {}) => {
    return axios.get(url, config)
}

export const post = (url, data, headers = {}) => {
    return axios.post(url, data, headers)
}

export const put = (url, data, headers = {}) => {
    return axios.put(url, data, headers)
}

export const patch = (url, data, headers = {}) => {
    return axios.patch(url, data, headers)
}

export const deleted = (url, headers = {}) => {
    return axios.delete(url, headers)
}

axios.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response.status === 401) {
        toast.error('No tienes permiso para realizar esta acción')
        if(localStorage.getItem('token')) localStorage.clear()
        setTimeout(()=>window.location.assign('/login'), 3000)
    }
    else if(error.response.status === 500) {
        toast.error('Error del servidor')
    }
    else {
        toast.error('Algo falló')
    }
    return Promise.reject(error)
})

class CRUDService {
    findAll = (endpoint, config = {}) => {
        return get(endpoint, config)
    }
    findOne = (endpoint, id) =>{
        return get(`${endpoint}${id}/`)
    }
    create = (endpoint, data) => {
        return post(endpoint, data)
    }
    update = (endpoint, id, data) => {
        return put(`${endpoint}${id}/`, data)
    }
    softDelete = (endpoint, id) => {
        return deleted(`${endpoint}${id}/`)
    }
}

export default new CRUDService()