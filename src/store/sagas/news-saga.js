import {
    put,
    call,
    takeLatest,
    takeEvery
  } from 'redux-saga/effects';

  import { NEWS_CONSTANTS } from '../actions/costants/news-constant';

  import {
    getAllNews,
    getTypes,
    addNews,
    updateNews,
    deleteNews,
    getCurrentNews,
    deleteImageFromBackend,
    deleteFileFromBackend,
    sendDataToUserWithPdfFormat,
    attachAdminToNews,
    getAttachedAdmins
  } from '../api/news-api';

  function* getAllNewsSaga({payload: {typeId, page}}) {
      try {
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_LOADING })
        const allNewsRequest = yield call(getAllNews, typeId, page)
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_COMPLETED, payload: allNewsRequest })
      }catch(err) {
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_ERROR, payload: err}) 
      }
  }

  function* getTypesSaga() {
      try {
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_TYPES_LOADING})
        const getTypesRequest = yield call(getTypes);
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_TYPES_COMPLETED,payload: getTypesRequest})
      }catch(err) {
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_TYPES_ERROR, payload: err}) 
      }
  }

  function* getCurrentNewsSaga({payload: {id}}) {
    try{
      yield put({type: NEWS_CONSTANTS.GET_CURRENT_NEWS_LOADING});
      const getCurrentNewsRequest = yield call(getCurrentNews, id);
      yield put({ type: NEWS_CONSTANTS.GET_CURRENT_NEWS_COMPLETED, payload: getCurrentNewsRequest })
    } catch(err) {
      console.log({err})
      yield put({type: NEWS_CONSTANTS.GET_CURRENT_NEWS_ERROR, payload: err.message})
    }
  }

  function* deleteNewsSaga({payload: {newsId, history}}) {
    try{
      yield put({type: NEWS_CONSTANTS.DELETE_NEWS_LOADING});
      const deletedNewsRequest = yield call(deleteNews, newsId, history);
      yield put({ type: NEWS_CONSTANTS.DELETE_NEWS_COMPLETED, payload: deletedNewsRequest })
    }catch(err) {

    }
  }

  function* attachAdminToNewsSaga({payload}) {
    try{
      const { newsId, email } = payload;
      yield put({type: NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_LOADING});
      const attachedAdminToNewsRequest = yield call(attachAdminToNews, newsId, email)
      const getCurrentNewsRequest = yield call(getCurrentNews, newsId)
      yield put({type: NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_COMPLETED, payload: attachedAdminToNewsRequest});
      yield put({type: NEWS_CONSTANTS.GET_CURRENT_NEWS_COMPLETED, payload: getCurrentNewsRequest })
    }catch(err) {
      console.log(err.response)
      yield put({type: NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_ERROR, payload: err})
    }
  }

  function* getAttachedAdminsSaga({payload: newsId}) {
    try{
      yield put({type: NEWS_CONSTANTS.GET_ATTACHED_ADMINS_LOADING});
      const attachedAdminsRequest = yield call(getAttachedAdmins, newsId);
      yield put({ type: NEWS_CONSTANTS.GET_ATTACHED_ADMINS_COMPLETED, payload: attachedAdminsRequest})
    }catch(err) {
      
    }
  }

  function* updateNewsSaga({payload}) {
    try{
      yield put({type: NEWS_CONSTANTS.UPDATE_NEWS_LOADING});
      const updatedNewsRequest = yield call(updateNews, {...payload});
      yield put({type: NEWS_CONSTANTS.UPDATE_NEWS_COMPLETED,payload: updatedNewsRequest })
    }catch(err) {
      yield put({type: NEWS_CONSTANTS.UPDATE_NEWS_ERROR, payload: err.response})
    }
  }

  function* deleteImageFromBackendSaga({payload: {path, newsId}}) {
    try {
      yield put({ type: NEWS_CONSTANTS.DELETE_IMAGE_LOADING});
      yield call(deleteImageFromBackend, path, newsId);
      yield put({type: NEWS_CONSTANTS.DELETE_IMAGE_COMPLETED,payload: {path, newsId} })
    } catch(err) {
      yield put({type: NEWS_CONSTANTS.DELETE_IMAGE_ERROR, payload: err})
    }
  }
  function* deleteFileFromBackendSaga({payload: {path, newsId}}) {
    try {
      yield put({ type: NEWS_CONSTANTS.DELETE_FILE_LOADING});
      yield call(deleteFileFromBackend, path, newsId);
      yield put({type: NEWS_CONSTANTS.DELETE_FILE_COMPLETED,payload: {path, newsId} })
    } catch(err) {
      yield put({type: NEWS_CONSTANTS.DELETE_IMAGE_ERROR, payload: err})
    }
  }

  function* addNewsSaga({payload}) {
    try {
      yield put({ type: NEWS_CONSTANTS.ADD_NEWS_LOADING});
      const addNewsRequest = yield call(addNews, {...payload});
      yield put({type: NEWS_CONSTANTS.ADD_NEWS_COMPLETED,payload: addNewsRequest })
    }catch(err) {
      console.log({err})
      yield put({type: NEWS_CONSTANTS.ADD_NEWS_ERROR, payload: err})
    }
  }

  function* sendDataToUserWithPdfFormatSaga({payload}) {
    try {
      yield put({ type: NEWS_CONSTANTS.SEND_DATA_FOR_PDF_LOADING});
      const sendDataToUserWithPdfFormatRequest = yield call(sendDataToUserWithPdfFormat, {...payload});
      yield put({type: NEWS_CONSTANTS.SEND_DATA_FOR_PDF_COMPLETED,payload: sendDataToUserWithPdfFormatRequest })
    }catch(err) {

    }
  } 
  export default function* newsSaga() {
    yield takeEvery(NEWS_CONSTANTS.GET_NEWS_PROCESS, getAllNewsSaga);
    yield takeLatest(NEWS_CONSTANTS.GET_NEWS_TYPES_PROCESS, getTypesSaga);
    yield takeEvery(NEWS_CONSTANTS.GET_CURRENT_NEWS_PROCESS,getCurrentNewsSaga );
    yield takeEvery(NEWS_CONSTANTS.DELETE_NEWS_PROCESS, deleteNewsSaga);
    yield takeEvery(NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_PROCESS, attachAdminToNewsSaga);
    yield takeEvery(NEWS_CONSTANTS.GET_ATTACHED_ADMINS_PROCESS, getAttachedAdminsSaga);
    yield takeEvery(NEWS_CONSTANTS.UPDATE_NEWS_PROCESS, updateNewsSaga);
    yield takeEvery(NEWS_CONSTANTS.DELETE_IMAGE_PROCESS, deleteImageFromBackendSaga);
    yield takeEvery(NEWS_CONSTANTS.DELETE_FILE_PROCESS, deleteFileFromBackendSaga);
    yield takeEvery(NEWS_CONSTANTS.ADD_NEWS_PROCESS, addNewsSaga);
    yield takeEvery(NEWS_CONSTANTS.SEND_DATA_FOR_PDF_PROCESS, sendDataToUserWithPdfFormatSaga)
  }