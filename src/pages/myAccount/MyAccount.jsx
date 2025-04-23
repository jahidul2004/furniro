import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";

const MyAccount = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            {user?.email}
        </div>
    );
};

export default MyAccount;