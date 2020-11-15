import React, { useEffect } from 'react';
import styled from 'styled-components';

import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

import { useSelector, useDispatch } from 'react-redux';

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
    const admin_id = useSelector(state => state.auth.admin_id);
    const dispatch = useDispatch();
    return(
        <Nav>
            <Container>
                {
                    localStorage.getItem('admin_id') ? <SignedInLinks/> : <SignedOutLinks/>
                }
            </Container>
        </Nav>
    )
}

export default Navbar;