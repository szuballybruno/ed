import axios from 'axios';
import {config} from '../configuration/config'

const instance = axios.create({
// .. where we make our configurations
    baseURL: config.backendUrl
});

instance.defaults.headers = {
    'Content-Type': 'application/json'
}


export default instance
