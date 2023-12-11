//modified homepage code
import "./HomePage.scss";
// HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import { calculatePercentage } from "../utils";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement // Register PointElement
);

function HomePage() {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [usedBudget, setUsedBudget] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [usedselectedCategory, setUsedSelectedCategory] = useState("");
  const [usedselectedYear, setUsedSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [usedselectedMonth, setUsedSelectedMonth] = useState("");
  const [userId, setUserId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [usedCategories, setUsedCategories] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    setUserId(storedUserId);
    fetchData(selectedYear, selectedMonth, storedUserId);
  }, [selectedYear, selectedMonth, selectedCategory]);

  useEffect(() => {
    fetchUsedCategories(); // Fetch used categories when the component mounts
  }, []);

  const fetchData = (year, month, userId) => {
    axios
      .get(`http://155.138.211.107:3002/api/get-budgets/${year}/${month}/${userId}`)
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  };

  const fetchTableData = () => {
    const storedUserId = localStorage.getItem("userId");
    axios
      .get(
        `http://155.138.211.107:3002/api/get-table-data/${selectedYear}/${storedUserId}`
      )
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  };

  const fetchUsedCategories = () => {
    axios
      .get("http://155.138.211.107:3002/api/get-all-categories")
      .then((response) => {
        setUsedCategories(response.data);
        // Assuming you want to select the first category by default
        setUsedSelectedCategory(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching used categories:", error);
      });
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");
    console.log("Token:", token);
    console.log("Expiration Time:", expirationTime);

    if (token && expirationTime) {
      const currentTime = new Date().getTime();
      const timeToExpire = expirationTime - currentTime;

      if (timeToExpire < 20000 && timeToExpire > 0) {
        // Show popup when token is about to expire in 20 seconds
        const extendSession = window.confirm(
          "Your session is about to expire. Do you want to extend it?"
        );
        if (extendSession) {
          const newExpirationTime = Date.now() + 60 * 1000; // Extend by 1 minute
          localStorage.setItem("tokenExpiration", newExpirationTime);
        } else {
          // Redirect to the root route if the session is not extended
          localStorage.removeItem("username");
          localStorage.removeItem("token");
          localStorage.removeItem("password");
          localStorage.removeItem("userid");
          localStorage.removeItem("tokenExpiration");
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    fetchTableData(); // Fetch table data when selectedYear changes
  }, [selectedYear]);
  
  // Check token expiration on component mount and every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5000);
  
    fetchTableData();
    return () => clearInterval(interval);
  
    // Fetch table data when selectedYear changes
    
  }, [selectedYear]);

  const totalBudget = budgets.reduce(
    (acc, budget) => acc + budget.allocated,
    0
  );
  
  const pieData = {
    labels: budgets.map((b) => b.category),
    datasets: [
      {
        data: budgets.map((b) => b.allocated),
        backgroundColor: ["blue", "green", "orange", "red", "brown"],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = budgets[context.dataIndex].category;
            const allocated = budgets[context.dataIndex].allocated;
            const percentage = calculatePercentage(allocated, totalBudget);

            const additionalInfo = `${category} - ${allocated} (${percentage}% of total budget)`;

            return additionalInfo;
          },
        },
      },
    },
  };

  const barData = {
    labels: budgets.map((b) => b.category),
    datasets: [
      {
        label: "Allocated Budget",
        data: budgets.map((b) => b.allocated),
        backgroundColor: "rgba(0, 123, 255, 0.5)",
      },
      {
        label: "Used Budget",
        data: budgets.map((b) => b.used),
        backgroundColor: "rgb(144, 238, 144, 0.7)",
      },
    ],
  };

  return (
    <body>
      <div className="pagecontent" style={{ display: "flex", flexDirection: "column" }}>
        <div className="charts-container">
          {/* Month and Year Selection Form */}
          {/* This is a Semantic HTML tag */}
          <form
            style={{
              width: "100%",
              height: "55px",
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            {/* Select Month */}
            <label style={{ display: "flex", width: "50%", fontSize: "15px" }}>
              Select Month:
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {[
                  "Select None",
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
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </label>

            {/* Select Year */}
            <label style={{ display: "flex", width: "50%", fontSize: "15px" }}>
              Select Year:
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              />
            </label>
          </form>

          <div
            className="onlychart"
            style={{ width: "800px", height: "410px", display: "flex" }}
          >
            {/* Pie Chart */}
            <div
              className="chart-box pie-chart-box"
              style={{ width: "100%", height: "100%" }}
            >
              <h2><center>Allocated Budget</center></h2>
              {budgets.length > 0 ? (
                <Pie data={pieData} options={pieOptions} />
              ) : (
                <p>No data available</p>
              )}
            </div>

            {/* Bar Chart */}
            <div
              className="chart-box bar-chart-box"
              style={{ height: "409px", width: "638px" }}
            >
              <h2><center>Used Budget</center></h2>
              {budgets.length > 0 ? (
                <Bar data={barData} />
              ) : (
                <p>No data available</p>
              )}
            </div>

            <div
              className="tablecontent"
              style={{ width: "50%", paddingBottom: "4cm" }}
            >
              <div
                className="year-selector"
                style={{
                  width: "100%",
                  paddingTop: "30px",
                  height: "80px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyItems: "center",
                }}
              >
                
              </div>

              <div className="budget-table">
                <h2>Budget Table {selectedYear}</h2>

                {/* This is Semantic HTML tag */}
                <table className="table" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      {/* <th scope="col">#</th>    */}
                      <th scope="col">Category</th>
                      {/* <th scope="col">Year</th>  */}
                      <th scope="col">Month</th>
                      <th scope="col">Allocated</th>
                      <th scope="col">Used budget</th>
                      <th scope="col">Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data, index) => (
                      <tr key={index} className="table-row">
                        {/*    <th scope="row">{data.id}</th>     */}
                        <td>{data.category}</td>
                        {/* <td>{data.year}</td>          */}
                        <td>{data.month}</td>
                        <td>{data.allocated}</td>
                        <td>{data.used}</td>
                        <td>
                          {data.allocated - data.used > 0
                            ? `${data.allocated - data.used} can be used`
                            : `Exceeded by ${data.used - data.allocated}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default HomePage;
