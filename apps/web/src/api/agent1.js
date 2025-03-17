import axios from 'axios';

// base api url
const envUrl = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.baseURL = `${envUrl}`;

// axios client
const client = axios.create({
    baseURL: axios.defaults.baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// api requests
const requests = {
    get: async (url) => await client.get(url),
    getProgress: async (url, request) => await client.get(url, request),
    post: async (url, body) => await client.post(url, body),
    postProgress: async (url, body, getConfig) => await client.post(url, body, getConfig),
    put: async (url, body) => await client.put(url, body),
    del: async (url) => await client.delete(url),
    postForm: async (url, values) => {
        let formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        const response = await client.post(url, formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        });
        return response;
    }
};

// authentication requests
const Authentication = {
    SignUp: (info) => requests.post(`/auth/signup`, info),
    Login: async (info) => {
        return await client.post('/auth/login', info);
    },
};

export default {
    Authentication
};
