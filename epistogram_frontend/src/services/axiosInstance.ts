import axios from 'axios';
import { backendUrl } from '../Environemnt';

const instance = axios.create({
// .. where we make our configurations
    baseURL: backendUrl
});

instance.defaults.withCredentials = true

instance.defaults.headers = {
    'Content-Type': 'application/json'
}

export default instance
