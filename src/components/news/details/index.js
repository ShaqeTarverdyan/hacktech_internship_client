import React, {useEffect } from 'react';
import styled from 'styled-components';
import { getTypes,deleteNews, getCurrentNews } from '../../../store/actions/action-creators/news-action-creators';
import { getAdmin } from '../../../store/actions/action-creators/auth-action-creators';
import { showModal } from '../../../store/actions/action-creators/app-action-creators';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import  { Wrapper } from '../../../generalStyles';
import Button from '../../UI/Button';
import Image from '../../UI/Image/Image';
import Modale from '../../Modale';
import AttachAdmin from '../../admins/attachAdmin';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from '../../../helpers/isAuth';

const Details = styled.div`
    border: 1px solid var(--color-mainDark);
    display: grid;
    grid-gap: 1rem;
    padding: 1rem 1.2rem;
    margin: 0.5rem;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
`;

export const ImagesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    width: 100%;

`;

const P = styled.p`
    font-size: 17px;
    text-align: start;
    color: var(--color-text)
`;

const H1 = styled.h1`
    text-align: center;
    padding: 3rem 0.2rem;
    font-size: 4rem;
    color: var(--color-mainDark)
`;

const H3 = styled(H1)`
    font-size: 2rem
`;
const Actions = styled.div`
    display: flex;
    align-self: flex-end;
`;

const File = styled.div`
    color: var(--color-mainDark);
    font-size: 17px;
    font-weight: bolder
`;

const FileWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

const Description = styled.div`
    border: 1px solid var(--color-text);
    border-radius: 1rem;
    padding: 1rem
`;

const AdminDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1.8rem;
    padding: 1rem

`;

const AdminDetail = styled.div`
    border-bottom: 1px dotted var(--color-text)
`


const NewsDetails = () => {
    useEffect(() => {
        isAuth()
    }, [])
    const currentNews = useSelector(state => state.news.currentNews);
    const admin = useSelector(state => state.auth.admin);

    const dispatch = useDispatch();

    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getAdmin(localStorage.getItem('admin_id')))
    },[ getTypes, getAdmin]);

    useEffect(() => {
        console.log('useefffect')
        dispatch(getCurrentNews(currentNewsId));
    },[getCurrentNews, currentNewsId])
    const signedInAdminsNews = admin && admin.news ? admin.news.find(item => item.id == currentNews.id) : '';
    console.log('signedInAdminsNews', signedInAdminsNews)
    return(
        <>
            <Wrapper>
                <Details>
                    <H1>{currentNews.title}</H1> 
                    <ImagesWrapper>
                        {
                            currentNews.news_images ? 
                            currentNews.news_images.map(image => (
                                <Image 
                                    key={image.id}
                                    imageUrl={image}
                                    isGetingImageUrl={true}
                                />
                            )): <div></div>
                        }
                    </ImagesWrapper>
                    <Description>
                        <P>{currentNews.content}</P>
                    </Description>
                    <Description>
                        <H3>{currentNews.admins && 'Attached Admins'}</H3>
                        <AdminDetails>
                            {
                                currentNews.admins && 
                                currentNews.admins.length ? 
                                currentNews.admins.map(admin => (
                                    <AdminDetail>
                                        <P>First Name: {admin.firstname}</P>
                                        <P>Last Name: {admin.lastname}</P>
                                        <P>Role: {admin.admin_News.role}</P>
                                    </AdminDetail>
                                )): ''
                            }
                        </AdminDetails>
                    </Description>
                    <FileWrapper>
                        {
                            currentNews.news_files? 
                            currentNews.news_files.map(file => (
                                <File>
                                    <a href={`${process.env.REACT_APP_URL}/${file.path}`} target="_blank">{file.originalname}</a>
                                </File>
                            )): <div/>
                        }
                    </FileWrapper>
                    {
                        signedInAdminsNews ? 
                        <Actions>
                            <Button style={Buttonstyle} onClick={() => dispatch(showModal())}>Attach Admin</Button> :
                            <Link 
                                to={{
                                    pathname:"/update-news/"+currentNews.id,
                                    aboutProps: {
                                        currentNews: currentNews
                                    }
                                }}
                            >
                                <Button style={Buttonstyle}>Update</Button>
                            </Link>
                            <Button  
                                onClick={() => dispatch(deleteNews(currentNews.id, history))}
                                style={Buttonstyle}
                            >
                                Delete
                            </Button>
                        </Actions> : 
                        <div/>
                    }
                </Details>
            </Wrapper>
            <Modale>
                <AttachAdmin
                    isForSendPdf={false}
                    newsId={currentNews.id}
                />
            </Modale>
        </>

    )
}
const Buttonstyle = {
    "borderRadius": "10px",
    "padding": "0.8rem",
    "fontWeight": "500",
    "margin": "0 5px",
    "background": "none",
    "color": "var(--color-main)",
    "border": "var(--color-main)",
    "boxShadow": "none",
    "fontSize": "16px",
    "width": "max-content"
}

export default NewsDetails;