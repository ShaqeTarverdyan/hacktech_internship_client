import { AUTH_CONSTANTS } from '../costants/auth-constant';

export const setAdminIdinStore = () => {
    const admin_id = localStorage.getItem('admin_id');
    return {type: AUTH_CONSTANTS.SET_ADMIN_ID_IN_STORE_COMPLETED, payload: admin_id}
}

export const getAdmins = (role) => {
    return { type: AUTH_CONSTANTS.GET_ADMINS_COMPLITED, payload: role}
}

export const clearMessages = () => {
    return { type: AUTH_CONSTANTS.CLEAR_MESSAGES_COMPLETED}
}

export const signUp = (admin,history) => {
    return { type: AUTH_CONSTANTS.SIGNUP_COMPLITED, payload: {admin, history}}
}

export const logIn = (admin,history) => {
    return { type: AUTH_CONSTANTS.ADMIN_LOGIN_COMPLITED, payload: {admin, history}}
}

export const logOut = () => {
    return { type: AUTH_CONSTANTS.LOGOUT_COMPLITED}
}

export const getAttachedNews = () => {
    return { type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_COMPLETED}
}

export const getAdmin = (id) => {
    return {type: AUTH_CONSTANTS.GET_ADMIN_COMPLITED, payload: {id}}
}

export const updateAdminDetails = (admin, history) => {
    return { type: AUTH_CONSTANTS.UPDATE_ADMIN_COMPLITED, payload: {admin, history}}
}

export const toggleConfirmation = (id, value) => {
    return { type: AUTH_CONSTANTS.ADMIN_CONFIRMATION_COMPLITED, payload: {id, value}}
}

export const togglePanelAdminStatus = (id, value) => {
    return { type: AUTH_CONSTANTS.ADMIN_STATUS_COMPLITED, payload: {id, value}}
}

export const deleteAdmin = (admin_id) => {
    return { type: AUTH_CONSTANTS.DELETE_ADMIN_COMPLITED, payload: {admin_id}}
}

export const sendInvitation = (values) => {
    return { type: AUTH_CONSTANTS.SEND_INVITATION_COMPLITED, payload: {...values}}
}

export const getInvitationData = (token) => {
    return { type: AUTH_CONSTANTS.GET_INVITATION_DATA_COMPLITED, payload: {token}}
}