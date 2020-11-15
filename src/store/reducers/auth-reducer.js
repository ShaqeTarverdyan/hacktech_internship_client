import { AUTH_CONSTANTS } from '../actions/costants/auth-constant';

const initialState = {
    loading: false,
    eror: null,
    admins: [],
    admin: {},
    admin_id: '',
    invitation: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    },
    message: '',
    errormessages: []
}

export default (state = initialState, {type, payload}) => {
    const newState = {...state};
    switch(type) {
        case AUTH_CONSTANTS.ADMIN_LOGIN_LOADING: {
            return { ...newState, loading: true}
        }
        case AUTH_CONSTANTS.ADMIN_LOGIN_PROCESS: {
            return {...newState, loading: false, error: null, admin_id: payload}
        }
        case AUTH_CONSTANTS.ADMIN_LOGIN_ERROR: {
            const messages = payload.data.errors.map(({param, msg}) => {
                return {[param]: msg} 
             })
            return {
                ...newState, 
                loading: false, 
                error: payload.data.message, 
                errormessages: [...messages]
            }
        }
        case AUTH_CONSTANTS.SIGNUP_LOADING: {
            return { ...newState, loading: true}
        }
        case AUTH_CONSTANTS.SIGNUP_PROCESS: {
            return { ...newState, loading: false, error: null}
        }
        case AUTH_CONSTANTS.SIGNUP_ERROR: {
            const messages = payload.data.errors.map(({param, msg}) => {
               return {[param]: msg} 
            })
            return {
                ...newState, 
                loading: false, 
                error: payload.data.message, 
                errormessages: [...messages]
            }
        }
        case AUTH_CONSTANTS.SET_ADMIN_ID_IN_STORE_PROCESS: {
            return {...newState, admin_id: payload}
        }
        case AUTH_CONSTANTS.DELETE_TOKEN_FROM_STORE: {
            return { ...newState, admin_id: ''}
        }
        case AUTH_CONSTANTS.GET_ADMIN_LOADING: {
            return {...newState, loading: true}
        }
        case AUTH_CONSTANTS.GET_ADMIN_PROCESS: {
            return {
                ...newState, 
                loading: false, 
                error: null, 
                admin: {...payload}
            }
        }
        case AUTH_CONSTANTS.GET_ADMIN_ERROR: {
            return {...newState, loading: false, error: payload}
        }
        case AUTH_CONSTANTS.GET_ADMINS_LOADING: {
            return { ...newState, loading: true}
        }
        case AUTH_CONSTANTS.GET_ADMINS_PROCESS: {
            const admins = payload;
            return {
                ...newState,
                loading: false,
                error: null,
                admins: [...admins]
            }
        }
        case AUTH_CONSTANTS.GET_ADMINS_ERROR: {
            return {...newState, loading: false, error: null}
        }

        case AUTH_CONSTANTS.UPDATE_ADMIN_LOADING: {
            return { ...newState, loading: true, error: null}
        }

        case AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS: {
            const updatedAdmin = {...payload};
            const updatedAdmins = newState.admins.map(admin => {
                if(admin.id === updatedAdmin.id) {
                    return updatedAdmin
                }
                return admin
            });
            return {
                 ...newState, 
                 loading: false, 
                 error: null, 
                 admin: {...payload},
                 admins: [...updatedAdmins]
                }
        }
        case AUTH_CONSTANTS.UPDATE_ADMIN_ERROR: {
            const messages = payload.data.errors.map(({param, msg}) => {
                return {[param]: msg} 
             })
             return {
                 ...newState, 
                 loading: false, 
                 error: payload.data.message, 
                 errormessages: [...messages]
             }
        }

        case AUTH_CONSTANTS.LOGOUT_PROCESS : {
                return { ...newState, admin_id: ''}
        }
        case AUTH_CONSTANTS.GET_ATTACHED_NEWS_LOADING: {
            return {
                ...newState,
                loading: true
            }
        }
        case AUTH_CONSTANTS.GET_ATTACHED_NEWS_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null, 
                admin: {...newState.admin, ...payload}
            }
        }
        case AUTH_CONSTANTS.GET_ATTACHED_NEWS_ERROR: {
            return { 
                ...newState,
                loading: false,
                error: payload
            }
        } 
        case AUTH_CONSTANTS.DELETE_ADMIN_LOADING: {
            return { ...newState, loading: true, error: null}
        }
        case AUTH_CONSTANTS.DELETE_ADMIN_PROCESS: {
            const remainedAdmins = newState.admins.filter(admin => admin.id !== payload);
            return {
                ...newState,
                loading: false,
                error: null,
                admins: [...remainedAdmins]
            }
        }
        case AUTH_CONSTANTS.DELETE_ADMIN_ERROR: {
            return {...newState, loading: false, error: null}
        }
        case AUTH_CONSTANTS.GET_INVITATION_DATA_LOADING: {
            return { ...newState, loading: true, error: null}
        }
        case AUTH_CONSTANTS.GET_INVITATION_DATA_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                invitation: {...newState.invitation, ...payload}
            }
        }

        case AUTH_CONSTANTS.GET_INVITATION_DATA_ERROR: {
            return {...newState, loading: false, error: null}
        }
        case AUTH_CONSTANTS.SEND_INVITATION_LOADING: {
            return { ...newState, loading: true, error: null}
        }
        case AUTH_CONSTANTS.SEND_INVITATION_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                message: payload
            }
        }
        case AUTH_CONSTANTS.SEND_INVITATION_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case AUTH_CONSTANTS.GET_MYNEWS_START: {
            return {
                ...newState,
                loading: true
            }
        }
        case AUTH_CONSTANTS.GET_MYNEWS_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null, 
                admin: {...newState.admin, ...payload}
            }
        }
        case AUTH_CONSTANTS.GET_MYNEWS_ERROR: {
            return { 
                ...newState,
                loading: false,
                error: payload
            }
        } 

        case AUTH_CONSTANTS.CLEAR_MESSAGES: {
            return {
                ...newState,
                errormessages: []
            }
        }
        default: {
			return newState
		}
    }
}