import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BookingDetails from "./BookingDetails";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const data = [
    {
      name: "Jan",
      MoneySpent: 400,
      Bookings: 3,
    },
    {
      name: "Feb",
      MoneySpent: 500,
      Bookings: 4,
    },
    {
      name: "Mar",
      MoneySpent: 600,
      Bookings: 5,
    },
    {
      name: "Apr",
      MoneySpent: 700,
      Bookings: 6,
    },
    {
      name: "May",
      MoneySpent: 800,
      Bookings: 7,
    },
    {
      name: "Jun",
      MoneySpent: 900,
      Bookings: 8,
    },
    {
      name: "Jul",
      MoneySpent: 1000,
      Bookings: 9,
    },
    {
      name: "Aug",
      MoneySpent: 1100,
      Bookings: 10,
    },
    {
      name: "Sep",
      MoneySpent: 1200,
      Bookings: 11,
    },
    {
      name: "Oct",
      MoneySpent: 1300,
      Bookings: 12,
    },
    {
      name: "Nov",
      MoneySpent: 1400,
      Bookings: 13,
    },
    {
      name: "Dec",
      MoneySpent: 1500,
      Bookings: 14,
    },
  ];
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const fetchUserBookings = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings/getUserBookings",
        { userInfo: userInfo._id }
      );
      console.log(response.data);
      setBookings(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);
  return (
    <>
      <div className="dashboard-title">Dashboard</div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Spendings</h2>
          <div className="card-data">
            <i className="bx bx-credit-card"></i>
            <p>1000$</p>
          </div>
        </div>
        <div className="dashboard-card">
          <h2>Total Bookings</h2>

          <div className="card-data">
            <i className="bx bxs-book"></i>
            <p>3</p>
          </div>
        </div>
        <div className="dashboard-card">
          <h2>Active Bookings</h2>
          <div className="card-data">
            <i className="bx bxs-book-bookmark"></i>
            <p>1</p>
          </div>
        </div>
        <div className="dashboard-stat">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="MoneySpent"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-data">Data</div>
        <div className="dashboard-bookings">
          <BookingDetails bookings={bookings} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
