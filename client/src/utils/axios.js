import axios from 'axios'
import { baseUrl } from './constants'

const  instance = axios.create({
    baseUrl:baseUrl
})

export default instance;