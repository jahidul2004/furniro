import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { dbUser, loading } = useContext(AuthContext);

    if (loading || !dbUser) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (dbUser.role === "admin") {
        return children;
    }

    return <Navigate to="/" replace={true} />;
};

export default AdminRoute;
