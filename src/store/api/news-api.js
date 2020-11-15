
import Axios from '../../axios';
///
export const getAllNews = async (typeId, page) => {
    const searchParams = new URLSearchParams();
    if(page) {
        searchParams.append("page", page);
    }
    if(typeId){
        searchParams.append("typeId", typeId);
    }
    const result = await Axios.get('/news',
        {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        },
        params: searchParams
        });
    return result.data.response
}

export const addNews = async ({news, history}) => {
    const { title, content, admin_id, files, typeId } = news;
    const formData= new FormData();
    if(files) {for (const file of files) {
        formData.append('file', file)
        }
    }
    formData.append('title', title);
    formData.append('content', content);
    formData.append('admin_id', admin_id);
    formData.append('type_id', +typeId);

    const response = await  Axios({
        method: 'post',
        url: '/news',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer' + localStorage.getItem("token")
        },
    });

    if(response.status === 200) {
        history.push('/adminsNews')
    }
    return response.data.news
}

export const updateNews = async({updatedNews, history}) => {
    const { id, title, content, typeId, files, images } = updatedNews;
    const formData= new FormData();
    if(files) {
        for (const file of files) {
            formData.append('file', file)
        }
    }
    if(images) {
        for(const image of images) {
            formData.append('file', image)
        }
    }
    formData.append('title', title);
    formData.append('content', content);
    formData.append('type_id', typeId);

    const response=  await Axios({
        method: 'put',
        url: `/news/${id}`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer' + localStorage.getItem("token")
        },
    });
    if(response.status === 200) {
        history.push('/news')  ;
    }
    // return response.data.news
}

export const deleteNews = async (newsId, history) => {
    const response = await Axios
        .delete(`/news/${newsId}`, {
            newsId: newsId,
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
    });
    if(response.data.isDeleted === 1) {
        history.push("/adminsNews")
        getAllNews()
    }
};

export const getCurrentNews = async (id) => {
    const response = await Axios
        .get(`/news-/${id}`, {
            newsId: id,
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
    });
    return response.data.news
};

export const getTypes = async () => {
    const response = await Axios.get("/types", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        }
    });
    return response.data.types

}

export const deleteImageFromBackend = async(path, newsId) => {
    alert("This Image will deleted from all places");
    const response = await Axios
        .get(`/deleteImage`, {
            params: {path: path},
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
    });
}

export const deleteFileFromBackend = async(path, newsId) => {
    alert("This file will deleted from all places");
    const response = await Axios
        .get(`/deleteFile`, {
            params: {path: path},
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
    });
    if(response.status === 200) {;
        return getCurrentNews(newsId)
    }
}
export const  sendDataToUserWithPdfFormat = async({fileIds, email}) => {
    console.log('fileIds, email', fileIds, email)
    const result = await Axios.post('/sendDataToUserWithPdfFormat', {
        newsIds: fileIds,
        email: email,
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        },
    });
    return result.data.message
}

export const attachAdminToNews = async(newsId, email) => {
    const result = await Axios.post('/attachAdminToNews', {
        newsId:newsId,
        email: email,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer' + localStorage.getItem("token")
        },
    });

    if(result.status === 200) {
        await getAttachedAdmins(newsId);
        await getCurrentNews(newsId)
    }
    return result.data.message;  
}

export const getAttachedAdmins = async(newsId) => {
    const result = await Axios.get('/attachedAdmins', {
        params:{
            newsId: newsId
        },
        headers: {
            Authorization: 'Bearer' + localStorage.getItem("token")
        },
    })
    return result.data.result[0].admins;
    
}
