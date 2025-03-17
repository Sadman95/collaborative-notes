import axios from 'axios';
import { validateJwt } from 'helpers/jwtHelper';
import { decrypt } from 'utils/decrypt';
import { encrypt } from 'utils/encrypt';

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

//interceptor for giving token in every request...
client.interceptors.request.use(
    (config) => {
        const currentUser = JSON.parse(JSON.parse(localStorage.getItem('persist:collaborative-notes')).auth).user;
        const token = validateJwt(decrypt(currentUser.token)) ? decrypt(currentUser.token) : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

client.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

// api requests
const requests = {
    get: async (url) => await client.get(url),
    getProgress: async (url, config = null) => await client.get(url, config),
    post: async (url, body = {}) => await client.post(url, body),
    postProgress: async (url, body, getConfig) => await client.post(url, body, getConfig),
    put: async (url, body) => await client.put(url, body),
    patch: async (url, body) => await client.patch(url, body),
    del: async (url) => await client.delete(url),
    postForm: async (url, values) => {
        let formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        return await client.patch(url, formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        });
    }
};

// user request
const User = {
    LogOut: () => requests.get(`/auth/logout`),
};

// groups requests
const Notes = {
    GetAll: () => requests.get(`/notes`),
    Create: (info) => requests.post(`/notes`, info),
    Update: ({ id, data }) => requests.patch(`/notes/${id}`, data),
    Delete: (id) => requests.del(`/notes/${id}`),
};


export default {
    User,
    Notes
};
