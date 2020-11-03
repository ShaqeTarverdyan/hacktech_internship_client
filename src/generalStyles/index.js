import styled from 'styled-components';
import { Form } from 'formik';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  border-radius: 0.7rem;
  padding: 0 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-mainLight);
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  padding: 7rem;
  margin: 4rem auto;
`;

export const StyledForm = styled(Form)`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

export const StyledSelect = styled.select`
    width: 100%;
    border-color: none;
    background-color: var(--color-mainLight);
    padding: 1.2rem 2rem;
    border: none;
    border-bottom: 1px solid var(--color-white);
    color: var(--color-white);
`;

export const StyledOption = styled.option`
    background-color: var(--color-main);
    padding: 1.2rem 2rem;
    border: none;
    font-size: 1.5rem;
    color: var(--color-mainDark)
`;

export const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem auto
`