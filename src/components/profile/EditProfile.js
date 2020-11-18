import React, { useEffect } from 'react';
import AuthForm from '../authentication/AuthForm';
import { updateAdminDetails, clearMessages  } from '../../store/actions/action-creators/auth-action-creators';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { isAuth } from '../../helpers/isAuth';

export const EditValidation = Yup.object().shape({
    firstname: Yup.string()
      .required('Your first name is required.'),
    lastname: Yup.string()
      .required('Your last name is required.'),
    email: Yup.string()
      .email('Invalid email.')
      .required('The email is required.'),
    role: Yup.string()
        .required('The role is required.')
  });

const EditProfile = () => {
    useEffect(() => {
      isAuth()
    },[])
    const admin = useSelector(state => state.auth.loggedAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessages())
    },[clearMessages]);
    return(
        <AuthForm 
            submitFunction={updateAdminDetails}
            defaultValues={{
                id: admin.id,
                firstname: admin.firstname || '',
                lastname: admin.lastname || '',
                email: admin.email || '',
                role: admin.role || ''
            }}
            butonTitle="update"
            title="Edit Profile"
            validationSchema={EditValidation}
        />
    )
}

export default EditProfile;