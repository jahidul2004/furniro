import { useEffect, useState } from "react";
import { TbUsers } from "react-icons/tb";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/allUsers")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, [users]);
    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <TbUsers className="text-info" />
                    Users
                </h1>
                <input
                    className="input mt-5 md:mt-0"
                    type="text"
                    placeholder="Search User by Name or Email"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table border border-gray-200">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-200">
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registered Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.creationTime}</td>
                                <td>
                                    <button className="btn btn-xs btn-dash btn-error">
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
