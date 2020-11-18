import React from 'react';
import { Link } from 'react-router-dom';
import { deleteAdmin } from '../../../store/actions/action-creators/auth-action-creators';
import styled from 'styled-components';
import Button from '../../UI/Button';
import { useDispatch, useSelector }from 'react-redux';

const StyledItem = styled.div`
    font-size: 2rem;
    border-bottom: 1px solid;
    color: var(--color-text);
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: ${({ isActive }) => (isActive ? '1' : '0.4')};
`;

const Actions = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-column-gap: 10px;
`;

const ButtonStyle = {
    "width": "80px",
    "margin": "0",
    "borderRadius": "1rem"
}
const AdminItem = ({ item }) => {
    const { id, email, role, isActive } = item;
    const dispatch = useDispatch();
    const logedinAdmin = useSelector(state => state.auth.loggedAdmin)
    return (
        <StyledItem isActive={isActive}>
            <div>
                <p>Email: {email}</p>
                <p>Role: {role}</p>
            </div>
            <Actions>
                <Link to={{
                    pathname: `/admin-details/${id}`,
                    aboutProps: {
                        id: id
                    }                 
                }}>
                    <Button style={ButtonStyle}>Details</Button>
                </Link>
                <Button 
                    style={ButtonStyle} 
                    onClick={() => dispatch(deleteAdmin(id))}
                    disabled={logedinAdmin.id === id}
                >Delete</Button>
            </Actions>
        </StyledItem>
    )
}

export default AdminItem;