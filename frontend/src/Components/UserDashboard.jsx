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
import BookingSummary from "./BookingSummary";

const UserDashboard = ({ bookings }) => {
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
        <div className="dashboard-data dash-general">Data</div>
        <div className="dashboard-bookings dash-general">
          <h3>Bookings</h3>
          <BookingSummary bookings={bookings} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
