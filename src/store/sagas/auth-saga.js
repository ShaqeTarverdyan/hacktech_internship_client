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
    getAttachedNews,
    toggleConfirmation,
    togglePanelAdminStatus,
    deleteAdmin,
    sendInvitation,
    getInvitationData,
    getLoggedAdmin
  } from '../api/auth-api';

function* getAdminsSaga({payload}) {
    try{
        yield put({ type: AUTH_CONSTANTS.GET_ADMINS_LOADING});
        const adminsRequest = yield call(getAdmins, payload);
        yield put({ type: AUTH_CONSTANTS.GET_ADMINS_COMPLETED, payload: adminsRequest})
    } catch(err) {
        yield put({type: AUTH_CONSTANTS.GET_ADMINS_ERROR, payload: err.message})
    }
}

function* clearmessagesSaga() {
  yield put({type: AUTH_CONSTANTS.CLEAR_MESSAGES_COMPLETED})
}

function* logInSaga({payload}) {
    try{
        const { admin, history } = payload;
        yield put({ type: AUTH_CONSTANTS.ADMIN_LOGIN_LOADING});
        const loginRequest = yield call(logIn, admin, history);
        yield put({type: AUTH_CONSTANTS.ADMIN_LOGIN_COMPLETED, payload: loginRequest});
    } catch(err) {
        yield put({type: AUTH_CONSTANTS.ADMIN_LOGIN_ERROR, payload: err.response})
    }
}

function* signUpSaga({payload}) {
  try{
    const { admin, history } = payload;
    yield put({ type: AUTH_CONSTANTS.SIGNUP_LOADING});
    const signup = yield call(signUp, admin, history);
    yield put({type: AUTH_CONSTANTS.SIGNUP_COMPLETED, payload: signup})
  }catch(err) {
    yield put({type: AUTH_CONSTANTS.SIGNUP_ERROR, payload: err.response})
  }
}

function* getAttachedNewsSaga() {
    try{
      yield put({ type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_LOADING});
      const attachedNewsRequest = yield call(getAttachedNews);
      yield put({ type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_COMPLETED, payload: attachedNewsRequest})
    } catch(err) {
      yield put({ type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_ERROR, payload: err}) 
    }
  }
  
  function* getAdminSaga({payload: {id}}) {
    try{
      yield put({type: AUTH_CONSTANTS.GET_ADMIN_LOADING});
      const getAdminRequest = yield call(getAdmin, id);
      yield put({type: AUTH_CONSTANTS.GET_ADMIN_COMPLETED, payload: getAdminRequest})
    } catch(err) {
      yield put({type: AUTH_CONSTANTS.GET_ADMIN_ERROR, payload: err.message})
    }
  }

  function* logOutSaga() {
    yield put({type: AUTH_CONSTANTS.LOGOUT_COMPLETED, payload: logOut()})
  }

  function* updateAdminDetailsSaga({payload}) {
    try{
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_LOADING});
      const updatedAdminRequest = yield call(updateAdminDetails, {...payload});
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_COMPLETED, payload: updatedAdminRequest});
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.response})
    }
  }

  function* toggleConfirmationSaga({payload: id, value}) {
    try{
      yield put({type: AUTH_CONSTANTS.CONFIRM_ADMIN_LOADING});
      const toggleConfirmationRequest =yield call(toggleConfirmation, id, value);
      yield put({type: AUTH_CONSTANTS.CONFIRM_ADMIN_COMPLETED, payload: toggleConfirmationRequest})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.CONFIRM_ADMIN_ERROR, payload: err.response})
    }
  }

  function* togglePanelAdminStatusSaga({payload: id, value}) {
    try{
      yield put({type: AUTH_CONSTANTS.TOGGLE_ADMIN_STATUS_LOADING});
      const togglePanelAdminStatusRequest =yield call(togglePanelAdminStatus, id, value);
      yield put({type: AUTH_CONSTANTS.TOGGLE_ADMIN_STATUS_COMPLETED, payload: togglePanelAdminStatusRequest})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.TOGGLE_ADMIN_STATUS_ERROR, payload: err.response})
    }
  }

  function* deleteAdminSaga({payload}) {
    try{
      yield put({type: AUTH_CONSTANTS.DELETE_ADMIN_LOADING});
      const deleteAdminRequest = yield call(deleteAdmin, {...payload});
      yield put({type: AUTH_CONSTANTS.DELETE_ADMIN_COMPLETED, payload: deleteAdminRequest});
    } catch(err) {
      yield put({type: AUTH_CONSTANTS.DELETE_ADMIN_ERROR, payload: err})
    }
  }

  function* sendInvitationSaga({payload: values}) {
    try{
      yield put({type: AUTH_CONSTANTS.SEND_INVITATION_LOADING});
      const sendInvitationRequest = yield call(sendInvitation, values);
      yield put({type: AUTH_CONSTANTS.SEND_INVITATION_COMPLETED, payload: sendInvitationRequest})
    } catch(err) {
      yield put({type: AUTH_CONSTANTS.SEND_INVITATION_ERROR, payload: err})
    }
  }

  function* getInvitationDataSaga({payload}) {
    try{
        const { token } = payload;
        yield put({type: AUTH_CONSTANTS.GET_INVITATION_DATA_LOADING});
        const getInvitationDataRequest = yield call(getInvitationData, token);
        yield put({type: AUTH_CONSTANTS.GET_INVITATION_DATA_COMPLETED, payload: getInvitationDataRequest})
    } catch(err) {
        yield put({type: AUTH_CONSTANTS.GET_INVITATION_DATA_ERROR, payload: err})
    }
  }

  function* getLoggedAdminSaga() {
    try {
      yield put({type: AUTH_CONSTANTS.GET_LOGGED_ADMIN_LOADING});
      const getLoggedAdminRequest = yield call(getLoggedAdmin);
      yield put({type: AUTH_CONSTANTS.GET_LOGGED_ADMIN_COMPLITED, payload: getLoggedAdminRequest})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.GET_LOGGED_ADMIN_ERROR, payload: err})
    }
  }
export default function* authSaga() {
    yield takeEvery(AUTH_CONSTANTS.GET_ADMINS_PROCESS, getAdminsSaga);
    yield takeEvery(AUTH_CONSTANTS.CLEAR_MESSAGES_PROCESS, clearmessagesSaga);
    yield takeEvery(AUTH_CONSTANTS.ADMIN_LOGIN_PROCESS, logInSaga);
    yield takeEvery(AUTH_CONSTANTS.SIGNUP_PROCESS, signUpSaga);
    yield takeEvery(AUTH_CONSTANTS.GET_ATTACHED_NEWS_PROCESS, getAttachedNewsSaga);
    yield takeEvery(AUTH_CONSTANTS.GET_ADMIN_PROCESS, getAdminSaga);
    yield takeEvery(AUTH_CONSTANTS.LOGOUT_PROCESS, logOutSaga);
    yield takeEvery(AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS, updateAdminDetailsSaga);
    yield takeEvery(AUTH_CONSTANTS.CONFIRM_ADMIN_PROCESS, toggleConfirmationSaga );
    yield takeEvery(AUTH_CONSTANTS.TOGGLE_ADMIN_STATUS_PROCESS,togglePanelAdminStatusSaga );
    yield takeEvery(AUTH_CONSTANTS.DELETE_ADMIN_PROCESS, deleteAdminSaga);
    yield takeEvery(AUTH_CONSTANTS.SEND_INVITATION_PROCESS,sendInvitationSaga );
    yield takeEvery(AUTH_CONSTANTS.GET_INVITATION_DATA_PROCESS, getInvitationDataSaga);
    yield takeEvery(AUTH_CONSTANTS.GET_LOGGED_ADMIN_PROCESS,getLoggedAdminSaga);
  }