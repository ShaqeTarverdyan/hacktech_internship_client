import {
    put,
    call,
    takeLatest,
    takeEvery
  } from 'redux-saga/effects';
  import { AUTH_CONSTANTS } from '../actions/costants/auth-constant';
  import {
    signUp,
    logIn,
    logOut,
    getAdmins,
    getAdmin,
    updateAdminDetails,
    setAdminIdinStore,
    getAttachedNews,
    toggleConfirmation,
    togglePanelAdminStatus,
    deleteAdmin,
    sendInvitation,
    getInvitationData
  } from '../api/auth-api';

function* setAdminIdinStoreSaga({ payload }) {
    try {
      yield put({ type: AUTH_CONSTANTS.SET_ADMIN_ID_IN_STORE_PROCESS, payload:setAdminIdinStore() })
    }catch(err) {
      
    }
}
function* getAdminsSaga({payload}) {
    try{
        yield put({ type: AUTH_CONSTANTS.GET_ADMINS_LOADING});
        const admins = yield call(getAdmins, payload);
        yield put({ type: AUTH_CONSTANTS.GET_ADMINS_PROCESS, payload: admins})
    } catch(err) {
        yield put({type: AUTH_CONSTANTS.GET_ADMINS_ERROR, payload: err.message})
    }
}

function* clearmessagesSaga() {
  yield put({type: AUTH_CONSTANTS.CLEAR_MESSAGES})
}

function* logInSaga({payload}) {
    try{
        const { admin, history } = payload;
        yield put({ type: AUTH_CONSTANTS.ADMIN_LOGIN_LOADING});
        const login = yield call(logIn, admin, history);
        yield put({type: AUTH_CONSTANTS.ADMIN_LOGIN_PROCESS, payload: login})
    } catch(err) {
        yield put({type: AUTH_CONSTANTS.ADMIN_LOGIN_ERROR, payload: err.response})
    }
}

function* signUpSaga({payload}) {
  try{
    const { admin, history } = payload;
    yield put({ type: AUTH_CONSTANTS.SIGNUP_LOADING});
    const signup = yield call(signUp, admin, history);
    yield put({type: AUTH_CONSTANTS.SIGNUP_PROCESS, payload: signup})
  }catch(err) {
    yield put({type: AUTH_CONSTANTS.SIGNUP_ERROR, payload: err.response})
  }
}

function* getAttachedNewsSaga() {
    try{
      yield put({ type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_LOADING});
      const attachedNews = yield call(getAttachedNews);
      yield put({ type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_PROCESS, payload:attachedNews})
    } catch(err) {
      yield put({ type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_ERROR, payload: err}) 
    }
  }
  
  function* getAdminSaga({payload: {id}}) {
    try{
      yield put({type: AUTH_CONSTANTS.GET_ADMIN_LOADING});
      const admin = yield call(getAdmin, id);
      yield put({type: AUTH_CONSTANTS.GET_ADMIN_PROCESS, payload: admin})
    } catch(err) {
      yield put({type: AUTH_CONSTANTS.GET_ADMIN_ERROR, payload: err.message})
    }
  }

  function* logOutSaga() {
    yield put({type: AUTH_CONSTANTS.LOGOUT_PROCESS, payload: logOut()})
  }

  function* updateAdminDetailsSaga({payload}) {
    try{
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_LOADING});
      const updatedAdmin =yield call(updateAdminDetails, {...payload});
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS, payloadL: updatedAdmin})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.response})
    }
  }

  function* toggleConfirmationSaga({payload: id, value}) {
    try{
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_LOADING});
      const toggleconfirm =yield call(toggleConfirmation, id, value);
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS, payload: toggleconfirm})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.response})
    }
  }

  function* togglePanelAdminStatusSaga({payload: id, value}) {
    try{
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_LOADING});
      const toggleconfirm =yield call(togglePanelAdminStatus, id, value);
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS, payload: toggleconfirm})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.response})
    }
  }

  function* deleteAdminSaga({payload}) {
    try{
      yield put({type: AUTH_CONSTANTS.DELETE_ADMIN_LOADING});
      const deletedAdmin = yield call(deleteAdmin, {...payload});
      yield put({type: AUTH_CONSTANTS.DELETE_ADMIN_PROCESS, payload: deletedAdmin});
    } catch(err) {
      yield put({type: AUTH_CONSTANTS.DELETE_ADMIN_ERROR, payload: err})
    }
  }

  function* sendInvitationSaga({payload: values}) {
    try{
      yield put({type: AUTH_CONSTANTS.SEND_INVITATION_LOADING});
      const sendInvitationRequest = yield call(sendInvitation, values);
      yield put({type: AUTH_CONSTANTS.SEND_INVITATION_PROCESS, payload: sendInvitationRequest})
    } catch(err) {
      yield put({type: AUTH_CONSTANTS.SEND_INVITATION_ERROR, payload: err})
    }
  }

  function* getInvitationDataSaga({payload}) {
    try{
        const { token } = payload;
        yield put({type: AUTH_CONSTANTS.GET_INVITATION_DATA_LOADING});
        const getInvitationDataRequest = yield call(getInvitationData, token);
        yield put({type: AUTH_CONSTANTS.GET_INVITATION_DATA_PROCESS, payload: getInvitationDataRequest})
    } catch(err) {
        yield put({type: AUTH_CONSTANTS.GET_INVITATION_DATA_ERROR, payload: err})
    }
  }
export default function* authSaga() {
    yield takeEvery(AUTH_CONSTANTS.SET_ADMIN_ID_IN_STORE_COMPLETED, setAdminIdinStoreSaga);
    yield takeEvery(AUTH_CONSTANTS.GET_ADMINS_COMPLITED, getAdminsSaga);
    yield takeEvery(AUTH_CONSTANTS.CLEAR_MESSAGES_COMPLETED, clearmessagesSaga);
    yield takeEvery(AUTH_CONSTANTS.ADMIN_LOGIN_COMPLITED, logInSaga);
    yield takeEvery(AUTH_CONSTANTS.SIGNUP_COMPLITED, signUpSaga);
    yield takeEvery(AUTH_CONSTANTS.GET_ATTACHED_NEWS_COMPLETED, getAttachedNewsSaga);
    yield takeEvery(AUTH_CONSTANTS.GET_ADMIN_COMPLITED, getAdminSaga);
    yield takeEvery(AUTH_CONSTANTS.LOGOUT_COMPLITED, logOutSaga);
    yield takeEvery(AUTH_CONSTANTS.UPDATE_ADMIN_COMPLITED, updateAdminDetailsSaga);
    yield takeEvery(AUTH_CONSTANTS.ADMIN_CONFIRMATION_COMPLITED, toggleConfirmationSaga );
    yield takeEvery(AUTH_CONSTANTS.ADMIN_STATUS_COMPLITED,togglePanelAdminStatusSaga );
    yield takeEvery(AUTH_CONSTANTS.DELETE_ADMIN_COMPLITED, deleteAdminSaga);
    yield takeEvery(AUTH_CONSTANTS.SEND_INVITATION_COMPLITED,sendInvitationSaga );
    yield takeEvery(AUTH_CONSTANTS.GET_INVITATION_DATA_COMPLITED, getInvitationDataSaga)
  }