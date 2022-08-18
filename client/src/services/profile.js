import { PROFILE_BASE_URL } from 'config';
import { get, post, put } from './api';

export function getProfile() {
    return get(PROFILE_BASE_URL + '/profile');
}

export function postProfile(data) {
    return post(PROFILE_BASE_URL + '/profile', data);
}