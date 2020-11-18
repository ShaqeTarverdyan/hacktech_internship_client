import React, { useEffect } from 'react';
import { addNews, getTypes } from '../../../store/actions/action-creators/news-action-creators';
import NewsForm from '../newsForm';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import useIsAuth from '../../../customHooks/useisAuth';

export const NewsValidation = Yup.object().shape({
    title: Yup.string()
      .required('The title is required.'),
    content: Yup.string()
      .required('The content is required.'),
    typeId: Yup.number()
      .required('The type is required.'),
  });

const AddNews = () => {
  useIsAuth();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
    },[getTypes])

    return (
        <NewsForm 
            formSubmitFunction={addNews}
            buttonTitle="Add News"
            headingTitle="Add News"
            initialValues={{
                title: '',
                content: '',
                typeId: '',
                files: [],
            }}
            isGetingImageUrl={false}
            validationSchema={NewsValidation}
        />
    )
}

export default AddNews;