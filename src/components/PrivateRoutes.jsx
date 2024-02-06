import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoutes = () => {
    const user = useSelector(state => state.authReducer)
    return (
        user.isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes