import axios from 'axios';
import {globalConfig} from '../configuration/config'

const instance = axios.create({
// .. where we make our configurations
    baseURL: globalConfig.backendUrl
});

instance.defaults.withCredentials = true

instance.defaults.headers = {
    'Content-Type': 'application/json'
}

export default instance
