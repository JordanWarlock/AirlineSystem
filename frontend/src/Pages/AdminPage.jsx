import "../css/AdminPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminBookings from "../Components/AdminBookings";
import { useNavigate } from "react-router";

const AdminConsole = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editUserData, setEditUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditUser = () => {
    setEditMode(true);
    setEditUserData({
      userName: selectedUser.userName,
      email: selectedUser.email,
      password: selectedUser.password,
    });
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete("http://localhost:5000/api/admin/deleteUser", {
        data: { user_id: selectedUser._id },
      });
      setSearchResults((prevResults) =>
        prevResults.filter((user) => user._id !== selectedUser._id)
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put("http://localhost:5000/api/admin/updateUser", {
        user_id: selectedUser._id,
        ...editUserData,
      });
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user._id === selectedUser._id ? { ...user, ...editUserData } : user
        )
      );
      setSelectedUser((prevUser) => ({ ...prevUser, ...editUserData }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleItemClick = (page) => {
    setActivePage(page);
    if (page === "Users") {
      setSearchInput("");
      setSearchResults([]);
      setSelectedUser(null);
    } else if (page === "Logout") {
      sessionStorage.removeItem("userInfo");
      navigate("/");
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/searchUser",
        { search_value: "" }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/searchUser",
        { search_value: searchInput }
      );
      setSearchResults(response.data);
      console.log(response.data);
      setSelectedUser(null); // Clear selected user when performing a new search
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserBookings();
    getAllUsers();
  }, []);

  const calculateAgeRanges = () => {
    const ageRanges = [
      { name: "0-18", count: 0 },
      { name: "19-25", count: 0 },
      { name: "26-35", count: 0 },
      { name: "36-50", count: 0 },
      { name: "51+", count: 0 },
    ];

    users.forEach((user) => {
      if (user.age <= 18) ageRanges[0].count += 1;
      else if (user.age <= 25) ageRanges[1].count += 1;
      else if (user.age <= 35) ageRanges[2].count += 1;
      else if (user.age <= 50) ageRanges[3].count += 1;
      else ageRanges[4].count += 1;
    });

    return ageRanges;
  };

  const calculateMonthlyBookings = () => {
    const bookingsByMonth = Array(12).fill(0);

    bookings.forEach((booking) => {
      const month = new Date(booking.bookingDateTime).getMonth();
      bookingsByMonth[month] += 1;
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames.map((name, index) => ({
      name,
      bookings: bookingsByMonth[index],
    }));
  };

  return (
    <div className="admin-container">
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="menu-icon" onClick={toggleSidebar}>
            &#9776;
          </div>
          {isSidebarOpen && <h2>Admin Console</h2>}
        </div>
        {isSidebarOpen && (
          <ul>
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleItemClick("Dashboard")}
              >
                <i className="fas fa-tachometer-alt sidebar-button-icon"></i>{" "}
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleItemClick("Users")}
              >
                <i className="fas fa-users sidebar-button-icon"></i> Users
              </button>
            </li>
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleItemClick("Bookings")}
              >
                <i className="fas fa-calendar-alt sidebar-button-icon"></i>{" "}
                Bookings
              </button>
            </li>
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleItemClick("Logout")}
              >
                <i className="fa-solid fa-arrow-right-from-bracket sidebar-button-icon"></i>{" "}
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className="content">
        {activePage === "Dashboard" && (
          <>
            <h1>Welcome to Admin Dashboard</h1>
            <div className="dashboard-row">
              <div className="d-card card-1">
                <h3 className="card-title">Total Users</h3>
                <p className="card-description">{users.length}</p>
              </div>
              <div className="d-card card-2">
                <h3 className="card-title">Total Bookings</h3>
                <p className="card-description">{bookings.length}</p>
              </div>
            </div>
            <div className="dashboard-row">
              <div className="dashboard-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={calculateAgeRanges()}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="dashboard-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={calculateMonthlyBookings()}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="bookings" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        {activePage === "Users" && (
          <>
            <h2>User Search</h2>
            <div className="admin-search-container">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search by username or user ID"
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  className="search-results-item"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="user-info">
                    <span className="user-name">{user.userName}</span>
                    <span className="user-id">{user._id}</span>
                  </div>
                </div>
              ))}
            </div>
            {selectedUser && (
              <div className="user-details">
                <h2>User Details</h2>
                {editMode ? (
                  <div>
                    <input
                      type="text"
                      value={editUserData.userName}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          userName: e.target.value,
                        })
                      }
                      placeholder="Username"
                    />
                    <input
                      type="email"
                      value={editUserData.email}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          email: e.target.value,
                        })
                      }
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={editUserData.password}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          password: e.target.value,
                        })
                      }
                      placeholder="Password"
                    />
                    <button onClick={handleUpdateUser}>Update</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span className="detail-label">Username:</span>{" "}
                      <span className="detail-value">
                        {selectedUser.userName}
                      </span>
                    </p>
                    <p>
                      <span className="detail-label">Email:</span>{" "}
                      <span className="detail-value">{selectedUser.email}</span>
                    </p>
                    <p>
                      <span className="detail-label">Password</span>{" "}
                      <span className="detail-value">
                        {selectedUser.password}
                      </span>
                    </p>
                    <button onClick={handleEditUser}>Edit</button>
                    <button onClick={handleDeleteUser}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {activePage === "Bookings" && <AdminBookings bookings={bookings} />}
      </div>
    </div>
  );
};

export default AdminConsole;
