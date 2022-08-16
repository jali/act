import JWT_DECODE from 'jwt-decode';
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

export function postLogin(data) {
    return post(AUTH_BASE_URL + '/login', data);
}

export function decodedTokenData(token) {
    const decoded = JWT_DECODE(token);
    return decoded;
}

export function hasTokenExpired(exp) {
    const now = Date.now();
    const expiresAt = parseInt(exp);
    return expiresAt && now >= (expiresAt * 1000);
}
