import React, { useEffect } from 'react';
import AuthForm from '../authentication/AuthForm';
import { updateAdminDetails, getAdmin, clearMessages  } from '../../store/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

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
    const admin = useSelector(state => state.auth.admin);
    const admin_id = useSelector(state => state.auth.admin_id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdmin(admin_id));
    }, [getAdmin, admin_id]);

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