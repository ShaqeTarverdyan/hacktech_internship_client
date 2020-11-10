export const isAuth = () => {
    return localStorage.getItem('token')? '' :  window.location.pathname = '/login'
}