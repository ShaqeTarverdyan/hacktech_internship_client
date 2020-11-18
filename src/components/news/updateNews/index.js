import React, { useEffect } from 'react';
import { 
    updateNews, 
    getTypes, 
    getCurrentNews, 
    deleteImageFromBackend, 
    deleteFileFromBackend 
} from '../../../store/actions/action-creators/news-action-creators';
import NewsForm from '../newsForm';
import { useHistory } from 'react-router-dom';
import Loading from '../../loader';
import Error from '../../errorPage';
import { useSelector, useDispatch } from 'react-redux';
import { NewsValidation } from '../addNews';
import useIsAuth from '../../../customHooks/useisAuth'

const UpdateNews = () => {
    useIsAuth()
    const loading = useSelector(state => state.news.loading);
    const error = useSelector(state => state.news.error);
    const currentNews = useSelector(state => state.news.currentNews);
    const imageLoading = useSelector(state => state.news.imageLoading);
    const dispatch = useDispatch();
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        dispatch(getCurrentNews(currentNewsId));
    },[getCurrentNews, currentNewsId]);

    useEffect(() => {
        currentNews && dispatch(getTypes());
    },[getTypes]);
    if(loading) {
        return <Loading/>
    }
    if(error) {
        return <Error/>
    }
    return (
         <NewsForm 
            formSubmitFunction={updateNews}
            buttonTitle="Update News"
            headingTitle="Update News"
            initialValues={{
                id: currentNews.id || '',
                title: currentNews.title || '',
                content: currentNews.content || '',
                typeId: currentNews.type_id || '',
                images: currentNews.news_images || [],
                files: currentNews.news_files || []
            }}
            isGetingImageUrl={true}
            deleteImageFromBackend={deleteImageFromBackend}
            deleteFileFromBackend={deleteFileFromBackend}
            imageLoading={imageLoading}
            validationSchema={NewsValidation}
        /> 
    )
}


export default UpdateNews;