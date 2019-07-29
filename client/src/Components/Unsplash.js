import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 4fd5b65cc6d1c1f5f62c329e1fc6c9848b3c344babb61224bcfbff1505c19f5d'
    }
})