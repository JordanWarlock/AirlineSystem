import React, { useState } from 'react';
import Header from "../Components/Header";
import headerimage from "../Pictures/h1-rom-lon-was-collage-hn.jpg";
import "../css/AdminPage.css";
import axios from 'axios';

const AdminPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updateData, setUpdateData] = useState({});
    const [flightStatus, setFlightStatus] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/admin/searchUser", { search_value: searchValue });
            setUsers(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setUpdateData(user);
    };

    const handleUpdate = async () => {
        try {
            await axios.put("http://localhost:5000/api/admin/updateUser", { userId: selectedUser._id, ...updateData });
            alert("User updated successfully");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete("http://localhost:5000/api/admin/deleteUser", { data: { userId: selectedUser._id } });
            alert("User deleted successfully");
            setUsers(users.filter(user => user._id !== selectedUser._id));
            setSelectedUser(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFlightStatusUpdate = async () => {
        try {
            await axios.put("http://localhost:5000/api/admin/updateFlightStatus", { userId: selectedUser._id, flightStatus });
            alert("Flight status updated successfully");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Header imageUrl={headerimage} />
            <div className="admin-console">
                <h1>Admin Console</h1>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Search by User ID or Name"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="user-list">
                    {users.map(user => (
                        <div key={user._id} className="user-item" onClick={() => handleUserSelect(user)}>
                            {user.firstName} {user.lastName}
                        </div>
                    ))}
                </div>
                {selectedUser && (
                    <div className="user-details">
                        <h2>User Details</h2>
                        <div className="input-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={updateData.firstName}
                                onChange={(e) => setUpdateData({ ...updateData, firstName: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={updateData.lastName}
                                onChange={(e) => setUpdateData({ ...updateData, lastName: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={updateData.email}
                                onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Flight Status:</label>
                            <input
                                type="text"
                                value={flightStatus}
                                onChange={(e) => setFlightStatus(e.target.value)}
                            />
                        </div>
                        <button onClick={handleUpdate}>Update User</button>
                        <button onClick={handleDelete}>Delete User</button>
                        <button onClick={handleFlightStatusUpdate}>Update Flight Status</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
