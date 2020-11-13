import { NEWS_CONSTANTS } from '../actions/costants/news-constant';

const initialState = {
    loading: false,
    error: null,
    newsList: [],
    currentNews: {},
    types: [],
    totalItems: '',
    totalPages: '',
    attachedAdmins: [],
    message: '',
    imageLoading: false,
    errormessages: []
}

export default (state = initialState, {type, payload}) => {
    const newState = {...state};
    switch(type) {
        case NEWS_CONSTANTS.GET_NEWS_LOADING: {
            return {
                ...newState,
                loading: true
            }
        }
        case NEWS_CONSTANTS.GET_NEWS_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                newsList: [...payload.news],
                totalItems: payload.totalItems,
                totalPages: payload.totalPages
            }
        }
        case NEWS_CONSTANTS.ADD_NEWS_LOADING: {
            return {
                ...newState,
                loading: true
            }
        }
        case NEWS_CONSTANTS.DELETE_NEWS_LOADING: {
            return {
                ...newState,
                loading: true
            }
        }
        case NEWS_CONSTANTS.GET_CURRENT_NEWS_LOADING: {
            return {
                ...newState,
                loading: true
            }
        }

        case NEWS_CONSTANTS.GET_CURRENT_NEWS_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                currentNews: {...payload},
            }
        }
        case NEWS_CONSTANTS.GET_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case NEWS_CONSTANTS.ADD_NEWS_ERROR: {
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
        case NEWS_CONSTANTS.UPDATE_NEWS_LOADING: {
            return {...newState, loading: true}
        }
        case NEWS_CONSTANTS.UPDATE_NEWS_PROCESS : {
            return {
                ...newState,
                loading: false,
                error: null
            }
        }
        case NEWS_CONSTANTS.UPDATE_NEWS_ERROR: {
            const messages = payload.data.errors.map(({param, msg}) => {
                return {[param]: msg} 
             })
             return {
                 ...newState, 
                 loading: false,
                 errormessages: [...messages]
             }
        }
        case NEWS_CONSTANTS.DELETE_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }

        case NEWS_CONSTANTS.GET_CURRENT_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }


        case NEWS_CONSTANTS.ADD_NEWS_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                newsList: [...newState.newsList, payload.news]
            }
        }

        case NEWS_CONSTANTS.DELETE_NEWS_PROCESS: {
            const remainedNews = newState.newsList.filter(news => news.id !== payload);
            return {
                ...newState,
                loading: false,
                error: null,
                newsList: [...remainedNews]
            }
        }

        case NEWS_CONSTANTS.GET_NEWS_TYPES_LOADING: {
            return {
                ...newState,
                loading: true,
                error: null
            }
        }

        case NEWS_CONSTANTS.GET_NEWS_TYPES_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                types: [...payload]
            }
        }
        case NEWS_CONSTANTS.GET_NEWS_TYPES_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case NEWS_CONSTANTS.GET_CURRENT_IMAGE_START: {
            return {
                ...newState,
                 loading: true,
                 error: null
            }
        }

        case NEWS_CONSTANTS.GET_CURRENT_IMAGE_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                currentNews: {...newState.currentNews, image: payload }
            }
        }

        case NEWS_CONSTANTS.GET_CURRENT_IMAGE_ERROR: {
            return {
                ...newState,
                loading: false,
                error: null
            }
        }
        case NEWS_CONSTANTS.GET_ATTACHED_ADMINS_LOADING: {
            return {
                ...newState,
                loading: true
            }
        }
        case NEWS_CONSTANTS.GET_ATTACHED_ADMINS_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                attachedAdmins: [...newState.attachedAdmins, ...payload]
            }
        }
        case NEWS_CONSTANTS.GET_ATTACHED_ADMINS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_LOADING: {
            return {
                ...newState,
                loading: true
            }
        }
        case NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                message: payload
            }
        }
        case NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case NEWS_CONSTANTS.SEND_DATA_FOR_PDF_LOADING: {
            return {
                ...newState,
                loading: true
            }
        }
        case NEWS_CONSTANTS.SEND_DATA_FOR_PDF_PROCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                message: payload
            }
        }
        case NEWS_CONSTANTS.SEND_DATA_FOR_PDF_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case NEWS_CONSTANTS.DELETE_IMAGE_LOADING: {
            return {
                ...newState,
                imageLoading: true
            }
        }
        case NEWS_CONSTANTS.DELETE_IMAGE_PROCESS: {
            return {
                ...newState,
                imageLoading: false
            }
        }
        case NEWS_CONSTANTS.DELETE_IMAGE_ERROR: {
            return {
                ...newState,
                imageLoading: false,
                error: payload
            }
        }
        case NEWS_CONSTANTS.DELETE_FILE_LOADING: {
            return {
                ...newState,
                imageLoading: true
            }
        }
        case NEWS_CONSTANTS.DELETE_FILE_PROCESS: {
            return {
                ...newState,
                imageLoading: false
            }
        }
        case NEWS_CONSTANTS.DELETE_FILE_ERROR: {
            return {
                ...newState,
                imageLoading: false,
                error: payload
            }
        }
 
        default: {
            return newState;
        }
    }
}