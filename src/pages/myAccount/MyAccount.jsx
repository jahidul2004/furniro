import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const MyAccount = () => {
    const { user, logout } = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            {user?.email}

            <button
                onClick={() => {
                    logout()
                        .then(() => {
                            console.log("Logout successful");
                            Swal.fire({
                                title: "Success",
                                text: "Logout successful",
                                icon: "success",
                                confirmButtonText: "Close",
                            });
                        })
                        .catch((error) => {
                            console.error("Logout error:", error.message);
                            Swal.fire({
                                title: "Error!",
                                text: error.message,
                                icon: "error",
                                confirmButtonText: "Close",
                            });
                        });
                }}
                className="btn btn-error"
            >
                Logout
            </button>
        </div>
    );
};

export default MyAccount;
