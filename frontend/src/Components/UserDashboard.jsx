import { useMemo } from "react";
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
import BookingSummary from "./BookingSummary";

const UserDashboard = ({ bookings }) => {
  // Function to process bookings data
  const processBookingsData = (bookings) => {
    const monthlyData = {};

    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.bookingDateTime);
      const month = bookingDate.toLocaleString("default", { month: "short" });

      if (!monthlyData[month]) {
        monthlyData[month] = { MoneySpent: 0, TaxPaid: 0 };
      }

      const price =
        typeof booking.price === "string"
          ? parseFloat(booking.price)
          : booking.price;
      const tax = booking.flight.priceBreakdown.tax.units;

      monthlyData[month].MoneySpent += price;
      monthlyData[month].TaxPaid += tax;
    });

    return Object.entries(monthlyData).map(([month, values]) => ({
      name: month,
      ...values,
    }));
  };

  const data = useMemo(() => processBookingsData(bookings), [bookings]);

  const countActiveBookings = () => {
    const currentTime = new Date();
    const twelveHoursLater = new Date(
      currentTime.getTime() + 12 * 60 * 60 * 1000
    );

    // Filter active bookings
    const activeBookings = bookings.filter((booking) => {
      const bookingTime = new Date(booking.bookingDateTime);
      return bookingTime <= twelveHoursLater;
    });

    return activeBookings.length;
  };

  const getTotalSpent = () => {
    let total = 0;
    bookings.forEach((booking) => {
      const price =
        typeof booking.price === "string"
          ? parseFloat(booking.price)
          : booking.price;
      total += price;
    });
    return total;
  };

  return (
    <>
      <div className="dashboard-title">Dashboard</div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Spendings</h2>
          <div className="card-data">
            <i className="bx bx-credit-card"></i>
            <p>{getTotalSpent()}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <h2>Total Bookings</h2>
          <div className="card-data">
            <i className="bx bxs-book"></i>
            <p>{bookings.length}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <h2>Active Bookings</h2>
          <div className="card-data">
            <i className="bx bxs-book-bookmark"></i>
            <p>{countActiveBookings()}</p>
          </div>
        </div>
        <div className="dashboard-stat dash-general">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <Bar dataKey="MoneySpent" fill="#8884d8" />
              <Bar dataKey="TaxPaid" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-bookings dash-general">
          <h3>Bookings</h3>
          <BookingSummary bookings={bookings} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
