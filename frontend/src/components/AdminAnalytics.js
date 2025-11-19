import React, { useEffect, useState } from "react";
import { getAdminAnalytics } from "../services/api";

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    getAdminAnalytics().then(setAnalytics);
  }, []);

  return (
    <div>
      <h3>Admin Analytics</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Room</th>
            <th>Total Hours Booked</th>
            <th>Total Revenue (₹)</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((item) => (
            <tr key={item.room}>
              <td>{item.room}</td>
              <td>{item.totalHours.toFixed(2)}</td>
              <td>{item.totalRevenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAnalytics;
