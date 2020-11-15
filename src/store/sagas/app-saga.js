import {
    put,
    call,
    takeLatest,
    takeEvery
  } from 'redux-saga/effects';
  import { APP_CONSTANTS } from '../actions/costants/app-constant';

function* show_Modal() {
    try {
        yield put({type: APP_CONSTANTS.SHOW_MODAL_COMPLETED});
    }catch(err) {

    }
}

function* close_Modal() {
  try {
      yield put({type: APP_CONSTANTS.CLOSE_MODAL_COMPLETED});
  }catch(err) {

  }
}

export default function* appSaga() {
  yield takeEvery(APP_CONSTANTS.SHOW_MODAL_PROCESS, show_Modal);
  yield takeEvery(APP_CONSTANTS.CLOSE_MODAL_PROCESS,close_Modal)
}
