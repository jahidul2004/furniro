import { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    console.log("User is:", user);
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border border-dashed flex flex-col border-info p-4 rounded">
                <img
                className="w-[150px] h-[150px] mx-auto rounded"
                    src={
                        user?.image
                            ? user.image
                            : "https://cdn-icons-png.flaticon.com/128/18567/18567329.png"
                    }
                    alt=""
                />
                <h1 className="text-center text-lg font-bold mt-2">{user?.displayName}</h1>
                <h1 className="text-center text-lg font-semibold">{user?.email}</h1>
            </div>
        </div>
    );
};

export default AdminProfile;
