import React, { useEffect } from 'react';
import { getAdmin } from '../../../store/actions/action-creators/auth-action-creators';
import { useHistory } from 'react-router-dom';
import PanelAdminActions from '../panelAdminActions';
import Loading from '../../loader';
import styled from 'styled-components';
import { Wrapper } from '../../../generalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from '../../../helpers/isAuth';

const StyledDetails = styled.div`
    width: 100%
`;
const P = styled.p`
    text-align: center;
    font-size: 2rem;
    border-bottom: 1px solid var(--color-main);
    color: var(--color-text)
`;
const Details = () => {
    useEffect(() => {
        isAuth()
    },[])
    const admin = useSelector(state => state.auth.admin);
    const dispatch= useDispatch();
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentAdminId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        dispatch(getAdmin(currentAdminId));
    }, [getAdmin, currentAdminId]);

    return (
        <Wrapper>

            {
                admin !== undefined ? 
                <StyledDetails>
                    <P>First Name: {admin.firstname}</P>
                    <P>Last Name: {admin.lastname}</P>
                    <P>Email: {admin.email}</P>
                    <P>Role: {admin.role}</P>
                    <P>IsActive: {admin.isActive === false ? 'false' : 'true'}</P>
                   {
                       admin.role === 'panel' &&
                       <PanelAdminActions 
                            id={admin.id} 
                            status={admin.isActive}
                            isConfirmed={admin.isConfirmed}
                        />
                   } 
                </StyledDetails> : <Loading/>
            }
        </Wrapper>
    )
}

export default Details;