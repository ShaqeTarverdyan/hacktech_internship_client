import {
    put,
    call,
    takeLatest,
    takeEvery
  } from 'redux-saga/effects';

  import { NEWS_CONSTANTS } from '../actions/costants/news-constant';

  //import all functions
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

    //asnc
  function* get_AllNews({payload: {typeId, page}}) {
      try {
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_LOADING })
        const allNews = yield call(getAllNews, typeId, page)
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_PROCESS, payload: allNews })
      }catch(err) {
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_ERROR, payload: err}) 
      }
  }

  function* get_Types() {
      try {
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_TYPES_LOADING})
        const types = yield call(getTypes);
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_TYPES_PROCESS,payload: types})
      }catch(err) {
        yield put({ type: NEWS_CONSTANTS.GET_NEWS_TYPES_ERROR, payload: err}) 
      }
  }

  function* get_Current_News({payload: {id}}) {
    try{
      yield put({type: NEWS_CONSTANTS.GET_CURRENT_NEWS_LOADING});
      const currentNews = yield call(getCurrentNews, id);
      yield put({ type: NEWS_CONSTANTS.GET_CURRENT_NEWS_PROCESS, payload: currentNews })
    } catch(err) {
      yield put({type: NEWS_CONSTANTS.GET_CURRENT_NEWS_ERROR, payload: err.message})
    }
  }

  function* delete_News({payload: {newsId, history}}) {
    try{
      yield put({type: NEWS_CONSTANTS.GET_CURRENT_NEWS_LOADING});
      const deletedNews = yield call(deleteNews, newsId, history);
      yield put({ type: NEWS_CONSTANTS.DELETE_NEWS_PROCESS, payload: deletedNews })
    }catch(err) {

    }
  }

  function* attach_Admin_To_News({payload}) {
    try{
      const { newsId, email } = payload;
      yield put({type: NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_LOADING});
      const attachedAdminToNews = yield call(attachAdminToNews, newsId, email)
      yield put({type: NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_PROCESS, payload: attachedAdminToNews})
    }catch(err) {
      console.log(err.response)
      yield put({type: NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_ERROR, payload: err})
    }
  }

  function* get_Attached_Admins({payload: newsId}) {
    try{
      yield put({type: NEWS_CONSTANTS.GET_ATTACHED_ADMINS_LOADING});
      const attachedAdmins = yield call(getAttachedAdmins, newsId);
      yield put({ type: NEWS_CONSTANTS.GET_ATTACHED_ADMINS_PROCESS, payload: attachedAdmins})
    }catch(err) {
      
    }
  }

  function* update_News({payload}) {
    try{
      yield put({type: NEWS_CONSTANTS.UPDATE_NEWS_LOADING});
      const updatedNews = yield call(updateNews, {...payload});
      yield put({type: NEWS_CONSTANTS.UPDATE_NEWS_PROCESS,payload: updatedNews })
    }catch(err) {
      yield put({type: NEWS_CONSTANTS.UPDATE_NEWS_ERROR, payload: err.response})
    }
  }

  function* delete_Image_From_Backend({payload: {path, newsId}}) {
    try {
      yield put({ type: NEWS_CONSTANTS.DELETE_IMAGE_LOADING});
      const deletedimage = yield call(deleteImageFromBackend, path, newsId);
      yield put({type: NEWS_CONSTANTS.DELETE_IMAGE_PROCESS,payload: deletedimage })
    } catch(err) {
      yield put({type: NEWS_CONSTANTS.DELETE_IMAGE_ERROR, payload: err})
    }
  }
  function* delete_File_From_Backend({payload: {path, newsId}}) {
    try {
      yield put({ type: NEWS_CONSTANTS.DELETE_FILE_LOADING});
      const deletedimage = yield call(deleteFileFromBackend, path, newsId);
      yield put({type: NEWS_CONSTANTS.DELETE_FILE_PROCESS,payload: deletedimage })
    } catch(err) {
      yield put({type: NEWS_CONSTANTS.DELETE_IMAGE_ERROR, payload: err})
    }
  }

  function* add_News({payload}) {
    try {
      yield put({ type: NEWS_CONSTANTS.ADD_NEWS_LOADING});
      const addNewslogic = yield call(addNews, {...payload});
      yield put({type: NEWS_CONSTANTS.ADD_NEWS_PROCESS,payload: addNewslogic })
    }catch(err) {

    }
  }

  function* sendDataToUserWithPdfFormatSaga({payload}) {
    try {
      yield put({ type: NEWS_CONSTANTS.SEND_DATA_FOR_PDF_LOADING});
      const sendDataToUserWithPdfFormatRequest = yield call(sendDataToUserWithPdfFormat, {...payload});
      yield put({type: NEWS_CONSTANTS.SEND_DATA_FOR_PDF_PROCESS,payload: sendDataToUserWithPdfFormatRequest })
    }catch(err) {

    }
  } 
  export default function* newsSaga() {
    yield takeEvery(NEWS_CONSTANTS.GET_NEWS_COMPLETED, get_AllNews);
    yield takeLatest(NEWS_CONSTANTS.GET_NEWS_TYPES_COMPLETED, get_Types);
    yield takeEvery(NEWS_CONSTANTS.GET_CURRENT_NEWS_COMPLETED,get_Current_News );
    yield takeEvery(NEWS_CONSTANTS.DELETE_NEWS_COMPLETED, delete_News);
    yield takeEvery(NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_COMPLETED, attach_Admin_To_News);
    yield takeEvery(NEWS_CONSTANTS.GET_ATTACHED_ADMINS_COMPLETED, get_Attached_Admins);
    yield takeEvery(NEWS_CONSTANTS.UPDATE_NEWS_COMPLITED, update_News);
    yield takeEvery(NEWS_CONSTANTS.DELETE_IMAGE_COMPLITED, delete_Image_From_Backend);
    yield takeEvery(NEWS_CONSTANTS.DELETE_FILE_COMPLITED, delete_File_From_Backend);
    yield takeEvery(NEWS_CONSTANTS.ADD_NEWS_COMPLITED, add_News);
    yield takeEvery(NEWS_CONSTANTS.SEND_DATA_FOR_PDF_COMPLITED, sendDataToUserWithPdfFormatSaga)
  }