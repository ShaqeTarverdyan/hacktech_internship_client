import { NEWS_CONSTANTS } from '../costants/news-constant';

export const getNewsList = (typeId, page) => {
    return { type: NEWS_CONSTANTS.GET_NEWS_PROCESS, payload:  {typeId, page}}
};

export const getTypes = () => {
  return { type: NEWS_CONSTANTS.GET_NEWS_TYPES_PROCESS}
};

export const deleteNews = (newsId, history) => {
  return { type: NEWS_CONSTANTS.DELETE_NEWS_PROCESS, payload: {newsId, history}}
}

export const getCurrentNews = (newsId) => {
  return { type: NEWS_CONSTANTS.GET_CURRENT_NEWS_PROCESS, payload: {id: newsId}}
}

export const attachAdminToNews = (newsId, {email}) => {
  return { type: NEWS_CONSTANTS.ATTACH_ADMIN_TO_NEWS_PROCESS, payload: {newsId, email}}
}

export const getAttachedAdmins = (newsId) => {
  return { type: NEWS_CONSTANTS.GET_ATTACHED_ADMINS_PROCESS, payload: newsId}
}

export const sendDataToUserWithPdfFormat = (fileIds, email) => {
  return { type: NEWS_CONSTANTS.SEND_DATA_FOR_PDF_PROCESS, payload: {fileIds, email}}
}

export const updateNews = (updatedNews, history) => {
  return { type: NEWS_CONSTANTS.UPDATE_NEWS_PROCESS, payload: {updatedNews, history}}
}

export const deleteImageFromBackend = (path, newsId) => {
  return { type: NEWS_CONSTANTS.DELETE_IMAGE_PROCESS, payload: {path, newsId}}
} 

export const deleteFileFromBackend = (path, newsId) => {
  return { type: NEWS_CONSTANTS.DELETE_FILE_PROCESS, payload: {path, newsId}}
}

export const addNews = (news, history) => {
  return { type: NEWS_CONSTANTS.ADD_NEWS_PROCESS, payload: {news, history}}
}