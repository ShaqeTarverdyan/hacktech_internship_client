import { spawn } from 'redux-saga/effects'

// Sagas
import newsSaga from './news-saga';
import authSaga from './auth-saga';
import appSaga from './app-saga';

// Export the root saga
export default function* rootSaga() {
  console.log("Hello From Redux-Saga!")

  yield spawn(newsSaga);
  yield spawn(authSaga);
  yield spawn(appSaga);
}