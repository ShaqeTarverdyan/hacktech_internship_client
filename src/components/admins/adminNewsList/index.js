import React, { useEffect } from 'react';
import NewsList from '../../news/newsList';
import { getAttachedNews } from '../../../store/actions/action-creators/auth-action-creators';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from '../../../helpers/isAuth';

const AdminNewsList = () => {
    const admin = useSelector(state => state.auth.loggedAdmin);

    const dispatch = useDispatch();

    useEffect(() => {
        isAuth()
    },[]);

    useEffect(() => {
        dispatch(getAttachedNews())
    }, [getAttachedNews]);

    return (
        <>
            <h1 style={{textAlign: 'center',margin: "5%"}}>My News</h1>
            {
                Object.keys(admin).length !== 0 && 
                <NewsList 
                    newsList={admin.news}
                    showTypes={false}
                    showPagination={false}
                    showReportFunctionality={true}

                />
            }
        </>
    )
}


export default AdminNewsList;