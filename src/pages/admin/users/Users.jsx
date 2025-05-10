import { useEffect, useState } from "react";
import { TbUsers } from "react-icons/tb";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("https://furniro-server-bay.vercel.app/allUsers")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const filteredUsers = users.filter(
        (user) =>
            user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-info text-white p-2 md:p-4 rounded">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <TbUsers className="text-white" />
                    Users
                </h1>
                <input
                    className="input text-black"
                    type="text"
                    placeholder="Search User by Name or Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table border border-gray-200">
                    <thead>
                        <tr className="bg-base-200">
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registered Date</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.map((user, index) => (
                            <tr key={user?._id || index}>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.creationTime}</td>
                                <td
                                    className={`${
                                        user?.role === "admin"
                                            ? "text-success"
                                            : ""
                                    }`}
                                >
                                    {user?.role}
                                </td>
                                <td>
                                    <button className="pointer-events-none btn btn-soft btn-xs btn-error">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
