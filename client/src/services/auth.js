import {
    getStorageItem,
    removeStorageItem,
    setStorageItem,
    post
} from './api';
import { AUTH_BASE_URL } from 'config';


export function logout() {
    removeToken();
}

export function removeToken() {
    removeStorageItem('access_token');
}

export function saveToken(params) {
    const { auth_token } = params;
    setStorageItem('access_token', auth_token);
}

export function getAuthToken() {
    return getStorageItem('access_token');
}

export function getExpiresAt() {
    return getStorageItem('expires_at');
}

export function postLogin(data) {
    return post(AUTH_BASE_URL + '/login', data);
}

