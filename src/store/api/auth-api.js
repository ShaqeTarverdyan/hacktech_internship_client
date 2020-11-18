import Axios from '../../axios';

export const signUp = async(newAdmin, history, isInvitaion) => {
    const { firstname, lastname, email, password, role, isConfirmed, isActive } = newAdmin;
    const result=  await Axios.post("/admin", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            role: role || 'panel',
            isConfirmed: isConfirmed || false,
            isActive: isActive || false,
            isInvitaion: isInvitaion || undefined
        })
        if(result.status === 201) {
            history.push('/login')
        }
}

export const logIn = async(admin,history) => {
    const { email, password } = admin;
    const result = await Axios.post("/login", {
        email: email,
        password: password,
    });
    const token = JSON.stringify(result.data.token);
    localStorage.setItem("token", token);
    if(result.status === 200) {
        history.push('/news')
    }
    return result.data.loggedAdmin
}

export const getLoggedAdmin = async() => {
    const loggedAdmin = localStorage.getItem("token")
    if(!loggedAdmin) {
        return
    }
    const result = await Axios.get(`/getLoggedAdmin`,{
        params: {loggedAdmin: loggedAdmin || ''},
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        }
    });
    return result.data.admin
}

export const logOut = () => {     
    localStorage.clear();
    window.location.pathname = '/login'
}

export const getAdmins = async(role) => {
    const result = await Axios.get('/admins', 
        {
            params: {role: role || undefined}
        },
        {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        }
    );
    return result.data.admins
}

export const getAdmin = async(admin_id) => {
    const result = await Axios.get(`/admin/${admin_id}`,{
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        }
    });
    return result.data.admin
} 

export const updateAdminDetails = async({admin, history}) => {
    const { firstname, lastname, email } = admin;
    const result = await  Axios.put(`/admin/${admin.id}`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        role: admin.role
    },{
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        }
    });
    if(result.status === 200) {
        history.push("/profile")
    }
    return result.data.admin
}


export const toggleConfirmation = async({id, value}) => {
    const result = await Axios.put(`/confirm/${id}`, {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        },
        isConfirmed: value
    });
    return result.data.admin;
}

export const togglePanelAdminStatus = async({id, value}) => {
    const result = await Axios.put(`/activateAdmin/${id}`, {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        },
        isActive: value,
    });
    return result.data.admin
}

export const deleteAdmin = async({admin_id}) => {
    const result = await Axios
        .delete(`/admin/${admin_id}`, {
            admin_id: admin_id,
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        }
    )
    const getAdmins = await getAdmins();
    if(result.status === 200) {
        return getAdmins
    }
};

export const sendInvitation = async(values) => {
    const { email, role } = values;
    const result = await Axios
        .post("/invitation", {
            email: email,
            role: role
        }
    )
    if(result.status === 200) {
        return result.data.message
    }
    return result.data.message
}

export const getInvitationData = async(token) => {
    const result = await Axios.get(`/recievedToken`, {
        params: {hashedToken: token}
    });
    return result.data

}

export const getAttachedNews = async() => {
    const response = await Axios.get('/myNews', {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        },
    })
    return response.data.result
}