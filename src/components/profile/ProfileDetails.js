import React, { useEffect } from 'react';
import { getAdmin  } from '../../store/actions/action-creators/auth-action-creators';
import  { Link } from 'react-router-dom';
import Loading from '../loader';
import styled from 'styled-components';
import Button from '../UI/Button';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from '../../helpers/isAuth';

const StyledProfile = styled.div`
    width: 65%;
    margin: 0 auto;
    border: 1px solid grey;
    display: grid;
    text-align: center;
    padding: 10px;
    margin: 10% auto
`;
const UL = styled.ul`
    list-style-type: none;
`;
const LI= styled.li`
    border-bottom: 1px solid var(--color-mainDark);
    font-size: 2rem;
    color: var(--color-text);
    width: 80%;
    margin: auto;
`;
const ProfileDetails = () => {
    useEffect(() => {
        isAuth()
    },[])
    const admin = useSelector(state => state.auth.loggedAdmin);
    const dispatch = useDispatch();
    const { id, firstname, lastname, email, role } = admin
    useEffect(() => {
        dispatch(getAdmin(id))
    },[getAdmin]);

    return (
        <StyledProfile>
            {
                admin ? 
                <UL>
                    <LI>First Name: {firstname}</LI>
                    <LI>Last Name: {lastname}</LI>
                    <LI>email: {email}</LI>
                    <LI>Role: {role}</LI>
                </UL> : 
                <Loading/>
            }
            <Link to={`/edit-profile/${admin.id}`}>
                <Button>Edit</Button>
            </Link>
        </StyledProfile>

    )
};


export default ProfileDetails;