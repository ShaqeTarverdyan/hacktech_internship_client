import { AUTH_CONSTANTS } from '../costants/auth-constant';

export const setAdminIdinStore = () => {
    const admin_id = localStorage.getItem('admin_id');
    return {type: AUTH_CONSTANTS.SET_ADMIN_ID_IN_STORE_PROCESS, payload: admin_id}
}

export const getAdmins = (role) => {
    return { type: AUTH_CONSTANTS.GET_ADMINS_PROCESS, payload: role}
}

export const clearMessages = () => {
    return { type: AUTH_CONSTANTS.CLEAR_MESSAGES_PROCESS}
}

export const signUp = (admin,history) => {
    return { type: AUTH_CONSTANTS.SIGNUP_PROCESS, payload: {admin, history}}
}

export const logIn = (admin,history) => {
    return { type: AUTH_CONSTANTS.ADMIN_LOGIN_PROCESS, payload: {admin, history}}
}

export const logOut = () => {
    return { type: AUTH_CONSTANTS.LOGOUT_PROCESS}
}

export const getAttachedNews = () => {
    return { type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_PROCESS}
}

export const getAdmin = (id) => {
    return {type: AUTH_CONSTANTS.GET_ADMIN_PROCESS, payload: {id}}
}

export const updateAdminDetails = (admin, history) => {
    return { type: AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS, payload: {admin, history}}
}

export const toggleConfirmation = (id, value) => {
    return { type: AUTH_CONSTANTS.CONFIRM_ADMIN_PROCESS, payload: {id, value}}
}

export const togglePanelAdminStatus = (id, value) => {
    return { type: AUTH_CONSTANTS.TOGGLE_ADMIN_STATUS_PROCESS, payload: {id, value}}
}

export const deleteAdmin = (admin_id) => {
    return { type: AUTH_CONSTANTS.DELETE_ADMIN_PROCESS, payload: {admin_id}}
}

export const sendInvitation = (values) => {
    return { type: AUTH_CONSTANTS.SEND_INVITATION_PROCESS, payload: {...values}}
}

export const getInvitationData = (token) => {
    return { type: AUTH_CONSTANTS.GET_INVITATION_DATA_PROCESS, payload: {token}}
}

export const getLoggedAdmin = () => {
    return { type: AUTH_CONSTANTS.GET_LOGGED_ADMIN_PROCESS}
}