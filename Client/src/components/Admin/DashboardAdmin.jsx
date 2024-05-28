import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardAdmin() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/admin/allUsers",{
                method:'GET',
                credentials:'include'
            });
            const data = await res.json();
            console.log(data)
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) => {
        return user.username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    

    const handleEdit = (userId) => {
        navigate(`/admin/editUser/${userId}`);
    
    };

    const handleDelete = async (userId) => {
        try {
            await fetch(`http://localhost:3000/api/admin/deleteUser/${userId}`, {
                method: "DELETE",
                credentials:'include'
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateUser = () => {
        navigate("/admin/createNewUser");
    };

    return (
        <div>
            <h1 className="font-bold text-2xl text-center p-3">User List</h1>
            <div className="flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search users..."
                    onChange={handleSearchChange}
                    value={searchQuery}
                    className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3"
                />
            </div>
            <div className="flex justify-center mb-3 pr-3"> 
                <button onClick={handleCreateUser} className="bg-black text-white rounded-full p-4 mr-3">
                    Create User
                </button>
            </div>
            <div className="flex flex-col bg-slate-700 max-w-5xl max-h-5 mx-auto">
                <div className="flex bg-slate-400 justify-between">
                    <h3 className="w-1/12 text-center">S.No</h3>
                    <h3 className="w-2/12">Image</h3>
                    <h3 className="w-2/12">Name</h3>
                    <h3 className="w-3/12">Email</h3>
                    <h3 className="w-2/12 text-center">Update</h3>
                    <h3 className="w-2/12 mr-3 text-center">Delete</h3>
                </div>
                {filteredUsers.map((user, index) => (
                    <div className="flex bg-white justify-between items-center py-4 px-6 mb-2 rounded-lg" key={index}>
                        <span className="w-1/12 text-center">{index + 1}</span>
                        <img className="w-20 h-20 object-cover rounded-full" src={user.profilePicture} alt="" />
                        <span className="w-2/12">{user.username}</span>
                        <span className="w-3/12">{user.email}</span>
                        <button
                            onClick={() => handleEdit(user._id)}
                            className="w-2/12 bg-blue-600 rounded-lg py-2 px-4 text-white hover:bg-blue-700"
                            type="button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(user._id)}
                            className="w-2/12 bg-red-600 rounded-lg py-2 px-4 text-white hover:bg-red-700"
                            type="button"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardAdmin;
