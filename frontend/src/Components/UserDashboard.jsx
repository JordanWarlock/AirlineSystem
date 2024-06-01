import React from "react";
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

const UserDashboard = () => {
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
        <div className="dashboard-bookings">Bookings</div>
      </div>
    </>
  );
};

export default UserDashboard;
