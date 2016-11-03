/**
 * Created by Alex on 03.11.2016.
 */

import { ADD_FLASH_MESSAGE } from './types';

export function addFlashMessage(message) {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    }
}