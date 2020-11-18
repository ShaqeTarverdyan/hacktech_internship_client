import React, { useEffect } from 'react';
import styled from 'styled-components';

import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

import { useSelector, useDispatch } from 'react-redux';
import { getLoggedAdmin } from '../../store/actions/action-creators/auth-action-creators';

const Nav = styled.nav`
    width: 100%;
    padding: 3rem 5rem;
    background: var(--color-mainLight)
`;
const Container = styled.div`
    display: flex;
    justify-content: space-between;

`;

const Navbar = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const loggedAdmin = useSelector(state => state.auth.loggedAdmin)
    useEffect(() => {
        token && dispatch(getLoggedAdmin(token))
    },[getLoggedAdmin, token])
    return(
        <Nav>
            <Container>
                {
                    loggedAdmin.id ? <SignedInLinks/> : <SignedOutLinks/>
                }
            </Container>
        </Nav>
    )
}

export default Navbar;