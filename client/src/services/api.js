import axios from 'axios';
import { getAuthToken } from './auth';

export async function getCommonHeaders() {
    const headers = {'Content-Type': 'application/json'};
    const token = getAuthToken();
    if (token) {
        headers['auth_token'] = token;
    }
    return headers;
}

export async function get(endpoint, params = {}, headers = {}) {
    return axios.get(endpoint, {params, headers: {...(await getCommonHeaders()), ...headers}});
}

export async function post(endpoint, data = {}, headers = {}) {
    return axios.post(endpoint, data, {headers: {...(await getCommonHeaders()), ...headers}});
}

export async function put(endpoint, data = {}, headers = {}) {
    return axios.put(endpoint, data, {headers: {...(await getCommonHeaders()), ...headers}});
}

export async function patch(endpoint, data = {}, headers = {}) {
    return axios.patch(endpoint, data, {headers: {...(await getCommonHeaders()), ...headers}});
}

export async function remove(endpoint, data = {}, headers = {}) {
    return axios.delete(endpoint, {data, headers: {...(await getCommonHeaders()), ...headers}});
}

export function getNativeWindow() {
    return window;
}

export function getLocation() {
    return getNativeWindow().location;
}

export function getStorage() {
    return getNativeWindow().localStorage;
}

export function redirectUrl(url) {
    return getLocation().assign(url);
}


export function setStorageItem(key, value) {
    return getStorage().setItem(key, value);
}

export function getStorageItem(key) {
    return getStorage().getItem(key);
}

export function removeStorageItem(key) {
    return getStorage().removeItem(key);
}
