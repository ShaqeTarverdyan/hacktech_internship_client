import React from 'react';
import { togglePanelAdminStatus, toggleConfirmation } from '../../../store/actions/action-creators/auth-action-creators';
import Button from '../../UI/Button';
import { Buttonstyle } from '../../news/newsItem';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
const ActionWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const PanelAdminActions = ({id, status, isConfirmed}) => {
    const dispatch = useDispatch();
    return (
        <ActionWrapper>
           {
                isConfirmed === true &&
                <Button style={Buttonstyle} onClick={() => dispatch(togglePanelAdminStatus(id, !status))}>
                    {status === true ? 'Block' : 'Activate'}
                </Button>
           } 
            <Button style={Buttonstyle} onClick={() => dispatch(toggleConfirmation(id, !isConfirmed))}>
                {isConfirmed === true ? 'DeConfirm': 'Confirm'}
            </Button>
        </ActionWrapper>
    )
};

export default PanelAdminActions;