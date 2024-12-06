import axios from 'axios'

const baseURL = process.env.URL_API

const api = axios.create({ baseURL })

export default api
