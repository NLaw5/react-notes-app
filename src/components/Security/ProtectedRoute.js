import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({isAuthorized}) => {

    // Grab our localstorage Token
    const checkToken = localStorage.getItem('token')
    let auth = false;

    if(checkToken == 'true')
    {
        auth = true
    }
    else
    {
        auth = false
    }
   
    return(
        // auth.token ? <Outlet/> : <Navigate to="/login"/>
       auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes