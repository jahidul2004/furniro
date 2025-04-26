import { TbUsers } from "react-icons/tb";

const Users = () => {
    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <TbUsers />
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
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr className="bg-base-200">
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>abc@def.com</td>
                            <td>
                                <button className="btn btn-xs btn-dash btn-error">
                                    Remove
                                </button>
                            </td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>abc@def.com</td>
                            <td>
                                <button className="btn btn-xs btn-dash btn-error">
                                    Remove
                                </button>
                            </td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>abc@def.com</td>
                            <td>
                                <button className="btn btn-xs btn-dash btn-error">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
