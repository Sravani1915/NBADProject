import axios from "axios";
import { useState, useEffect } from "react";
import "./BudgetDetails.scss";

const BudgetDetails = () => {
  const [usedselectedCategory, setUsedSelectedCategory] = useState("");
  const [usedselectedYear, setUsedSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [usedselectedMonth, setUsedSelectedMonth] = useState("");
  const [userId, setUserId] = useState("");
  const [usedBudget, setUsedBudget] = useState(0);
  const [usedCategories, setUsedCategories] = useState([]);

  useEffect(() => {
    fetchUsedCategories();
  }, []);

  const fetchUsedCategories = async () => {
    try {
      const response = await axios.get("http://155.138.211.107:3002/api/get-all-categories");
      setUsedCategories(response.data);
      // Assuming you want to select the first category by default
      setUsedSelectedCategory(response.data[0] || "");
    } catch (error) {
      console.error("Error fetching used categories:", error);
    }
  };

  const handleUsedBudgetSubmit = async (e) => {
    e.preventDefault();

    console.log("Handling form submission.");

    const storedUserId = localStorage.getItem("userId");
    const usedBudgetNumber = parseFloat(usedBudget);

    const payload = {
      category: usedselectedCategory,
      used: usedBudgetNumber,
      month: usedselectedMonth,
      year: usedselectedYear,
      userId: storedUserId,
    };

    try {
      await axios.post("http://155.138.211.107:3002/api/enter-used-budget", payload);
      console.log("Used Budget update successful");
      // You might want to call fetchData here or handle the success as needed
    } catch (error) {
      console.error("Error entering used budget:", error);
      if (error.response && error.response.data) {
        console.error("Server error message:", error.response.data);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enter Used Budget</h2>
      <form onSubmit={handleUsedBudgetSubmit} style={styles.form}>
        <div style={styles.row}>
          <label style={styles.label}>
            Month:
            <select
              value={usedselectedMonth}
              onChange={(e) => setUsedSelectedMonth(e.target.value)}
              style={styles.input}
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

          <label style={styles.label}>
            Year:
            <input
              type="number"
              value={usedselectedYear}
              onChange={(e) => setUsedSelectedYear(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>

        <label style={styles.label}>
          Category:
          <select
            value={usedselectedCategory}
            onChange={(e) => setUsedSelectedCategory(e.target.value)}
            style={styles.input}
          >
            {usedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Enter Used Budget:
          <input
            type="number"
            value={usedBudget}
            onChange={(e) => setUsedBudget(e.target.value)}
            style={styles.input}
          />
        </label>
         <button type="submit" style={{ ...styles.button, marginTop: "-10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    height: "420px",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
    backgroundColor: "rgba(248, 248, 248, 0.7)",
    borderRadius: "8px",
    marginRight: "10x",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Changed width to 100%
    alignItems: "center",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    fontSize: "14px", // Reduced the font size
    fontWeight: "500",
    color: "#333",
    padding: "10px",
    marginBottom: "10px",
    width: "48%",
  },
  input: {
    height: "40px",
    width: "100%",
    outline: "none",
    border: "none",
    padding: "0 10px",
    fontSize: "14px", // Reduced the font size
    fontWeight: "500",
    borderBottom: "2px solid rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  button: {
    color: "#fff",
    backgroundColor: "#44b5e6",
    borderRadius: "6px",
    padding: "10px",
    cursor: "pointer",
    transition: "all 0.4s ease",
    border: "none",
    outline: "none",
  },
};

export default BudgetDetails;
