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
    getInvitationData
  } from '../api/auth-api';

function* getAdminsSaga({payload}) {
    try{
        yield put({ type: AUTH_CONSTANTS.GET_ADMINS_LOADING});
        const admins = yield call(getAdmins, payload);
        yield put({ type: AUTH_CONSTANTS.GET_ADMINS_COMPLETED, payload: admins})
    } catch(err) {
        yield put({type: AUTH_CONSTANTS.GET_ADMINS_ERROR, payload: err.message})
    }
}

function* clearmessagesSaga() {
  console.log('shaqe')
  yield put({type: AUTH_CONSTANTS.CLEAR_MESSAGES_COMPLETED})
}

function* logInSaga({payload}) {
    try{
        const { admin, history } = payload;
        yield put({ type: AUTH_CONSTANTS.ADMIN_LOGIN_LOADING});
        const login = yield call(logIn, admin, history);
        yield put({type: AUTH_CONSTANTS.ADMIN_LOGIN_COMPLETED, payload: login})
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
      const attachedNews = yield call(getAttachedNews);
      yield put({ type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_COMPLETED, payload:attachedNews})
    } catch(err) {
      yield put({ type: AUTH_CONSTANTS.GET_ATTACHED_NEWS_ERROR, payload: err}) 
    }
  }
  
  function* getAdminSaga({payload: {id}}) {
    try{
      yield put({type: AUTH_CONSTANTS.GET_ADMIN_LOADING});
      const admin = yield call(getAdmin, id);
      yield put({type: AUTH_CONSTANTS.GET_ADMIN_COMPLETED, payload: admin})
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
      const updatedAdmin =yield call(updateAdminDetails, {...payload});
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_COMPLETED, payloadL: updatedAdmin})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.response})
    }
  }

  function* toggleConfirmationSaga({payload: id, value}) {
    try{
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_LOADING});
      const toggleconfirm =yield call(toggleConfirmation, id, value);
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_COMPLETED, payload: toggleconfirm})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.response})
    }
  }

  function* togglePanelAdminStatusSaga({payload: id, value}) {
    try{
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_LOADING});
      const toggleconfirm =yield call(togglePanelAdminStatus, id, value);
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_COMPLETED, payload: toggleconfirm})
    }catch(err) {
      yield put({type: AUTH_CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.response})
    }
  }

  function* deleteAdminSaga({payload}) {
    try{
      yield put({type: AUTH_CONSTANTS.DELETE_ADMIN_LOADING});
      const deletedAdmin = yield call(deleteAdmin, {...payload});
      yield put({type: AUTH_CONSTANTS.DELETE_ADMIN_COMPLETED, payload: deletedAdmin});
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
export default function* authSaga() {
    yield takeEvery(AUTH_CONSTANTS.GET_ADMINS_PROCESS, getAdminsSaga);
    yield takeEvery(AUTH_CONSTANTS.CLEAR_MESSAGES_PROCESS, clearmessagesSaga);
    yield takeEvery(AUTH_CONSTANTS.ADMIN_LOGIN_PROCESS, logInSaga);
    yield takeEvery(AUTH_CONSTANTS.SIGNUP_PROCESS, signUpSaga);
    yield takeEvery(AUTH_CONSTANTS.GET_ATTACHED_NEWS_PROCESS, getAttachedNewsSaga);
    yield takeEvery(AUTH_CONSTANTS.GET_ADMIN_PROCESS, getAdminSaga);
    yield takeEvery(AUTH_CONSTANTS.LOGOUT_PROCESS, logOutSaga);
    yield takeEvery(AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS, updateAdminDetailsSaga);
    yield takeEvery(AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS, toggleConfirmationSaga );
    yield takeEvery(AUTH_CONSTANTS.UPDATE_ADMIN_PROCESS,togglePanelAdminStatusSaga );
    yield takeEvery(AUTH_CONSTANTS.DELETE_ADMIN_PROCESS, deleteAdminSaga);
    yield takeEvery(AUTH_CONSTANTS.SEND_INVITATION_PROCESS,sendInvitationSaga );
    yield takeEvery(AUTH_CONSTANTS.GET_INVITATION_DATA_PROCESS, getInvitationDataSaga);
  }