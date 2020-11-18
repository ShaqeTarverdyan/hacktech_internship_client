
import { useHistory } from 'react-router-dom';
import { getLoggedAdmin } from '../store/api/auth-api'
const  useIsAuth = async() => {
    const history = useHistory();
    const getLoggedAdminRequest = await getLoggedAdmin()
    console.log('getLoggedAdminRequest', getLoggedAdminRequest)
    if(!getLoggedAdminRequest.id){
       return  history.push("/login")
    }
    return 
}

export default useIsAuth;