import "../css/AdminPage.css";
import React, { useState } from "react";
import axios from "axios";

const AdminConsole = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (page) => {
    setActivePage(page);
    if (page === "Users") {
      // Clear search input, search results, and selected user when switching to Users page
      setSearchInput("");
      setSearchResults([]);
      setSelectedUser(null);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/searchUser",
        { search_value: searchInput }
      );
      setSearchResults(response.data);
      setSelectedUser(null); // Clear selected user when performing a new search
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
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
              <button onClick={() => handleItemClick("Dashboard")}>
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => handleItemClick("Users")}>Users</button>
            </li>
            <li>
              <button onClick={() => handleItemClick("Bookings")}>
                Bookings
              </button>
            </li>
            <li>
              <button onClick={() => handleItemClick("Settings")}>
                Settings
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className="content">
        {activePage === "Dashboard" && (
          <>
            <h2>Welcome to Dashboard</h2>
            <p>This is the dashboard view.</p>
          </>
        )}
        {activePage === "Users" && (
          <>
            <h2>User Search</h2>
            <div className="search-container">
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
                    <span className="detail-label">Password:</span>{" "}
                    <span className="detail-value">
                      {selectedUser.password}
                    </span>
                  </p>
                  {/* Add more user details here */}
                </div>
              )}
          </>
        )}
        {activePage === "Bookings" && (
          <>
            <h2>Welcome to Bookings</h2>
            <p>This is the bookings view.</p>
          </>
        )}
        {activePage === "Settings" && (
          <>
            <h2>Change the Settings</h2>
            <p>This is the settings view.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminConsole;
