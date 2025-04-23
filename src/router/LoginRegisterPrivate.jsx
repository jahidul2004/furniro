import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const LoginRegisterPrivate = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-lg mx-auto my-10"></span>
            </div>
        );
    }

    if (!user) {
        return children;
    }

    return <Navigate to="/" replace={true}></Navigate>;
};

export default LoginRegisterPrivate;
