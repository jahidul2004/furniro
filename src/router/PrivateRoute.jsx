import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" replace={true}></Navigate>;
};

export default PrivateRoute;
