import React, { useEffect } from 'react';
import { getAdmins } from '../../../store/actions/action-creators/auth-action-creators';
import PanelAdminActions from '../panelAdminActions';
import { useSelector, useDispatch } from 'react-redux';
import useIsAuth from '../../../customHooks/useisAuth';
import styled from 'styled-components';

const UL = styled.ul`
    width: 70%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
`;

const LI = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem;
    border-bottom: 1px dotted var(--color-text)
`;

const P = styled.p`
    font-size: 15px;
    color:var(--color-text)
`

const AcceptAdmins = () => {
    const admins = useSelector(state => state.auth.admins);
    const dispatch = useDispatch();
    useIsAuth()
    useEffect(() => {
        dispatch(getAdmins());
    }, [getAdmins, JSON.stringify(admins)]);

    return (
        <UL>
            {
                admins
                    .filter(admin => admin.role === 'panel')
                    .map(({id, firstname, lastname, email, role, isActive, isConfirmed}) => (
                    <LI key={id}>
                        <P>First Name: {firstname}</P>
                        <P>last name: {lastname}</P>
                        <P>email: {email}</P>
                        <P>role: {role}</P>
                        <P>isActive: {isActive === false ? 'false' : 'true'}</P>
                        <PanelAdminActions id={id} status={isActive} isConfirmed={isConfirmed}/>
                    </LI>
                ))
            }
        </UL>
    )
}

export default AcceptAdmins;