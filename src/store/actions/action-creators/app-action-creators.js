import { APP_CONSTANTS } from '../costants/app-constant';

export const showModal = () => {
    return {type: APP_CONSTANTS.SHOW_MODAL_COMPLITED}
}

export const closeModal = () => {
    return {type: APP_CONSTANTS.CLOSE_MODAL_COMPLITED}
}