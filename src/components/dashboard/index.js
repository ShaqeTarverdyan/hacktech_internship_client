import React, {useEffect } from 'react';
import { useHistory }  from 'react-router-dom';
import NewsList from '../news/newsList';
import { getNewsList } from '../../store/actions/action-creators/news-action-creators'
import Loading from '../loader';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from '../../helpers/isAuth';


const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("newsList", newsList)
        dispatch(getNewsList())
    },[getNewsList])


    useEffect(() => {
        isAuth()
    },[])
    const newsList = useSelector(state => state.news.newsList);
    const admin = useSelector(state => state.auth.loggedAdmin)
    let history = useHistory();
    if(!admin) {
        history.push("/login")
    }
    return (
        <>
            <h1 style={{textAlign: 'center',margin: "5%"}}>All News</h1>
            <NewsList
                newsList={newsList}
                showTypes={true}
                showPagination={true}
                showReportFunctionality={false}
            />
        </>
    )
}



export default Dashboard;