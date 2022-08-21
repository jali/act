import { VISION_BASE_URL } from 'config';
import { get, post } from './api';

export function getVisionList() {
    return get(VISION_BASE_URL + '/vision/all');
}
