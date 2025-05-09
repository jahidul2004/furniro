import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const NotAdminRoute = ({ children }) => {
    const { dbUser, loading } = useContext(AuthContext);

    if (loading || !dbUser) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    if (dbUser?.role !== "admin") {
        return children;
    }

    return <Navigate to="/" replace={true} />;
};

export default NotAdminRoute;
