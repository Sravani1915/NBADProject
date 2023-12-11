import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData = await response.json();

        if (userData.accessToken) {
          handleToken(userData.accessToken);

          const decodedToken = decodeToken(userData.accessToken);

          if (decodedToken && decodedToken.userId) {
            const { userId } = decodedToken;
            const { firstname } = userData;

            localStorage.setItem("userId", userId);
            localStorage.setItem("firstname", firstname);

            navigate("/homepage");
          } else {
            console.error("User ID not found", decodedToken);
          }
        } else {
          console.error("Access token not found", userData);
        }
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);

    const expirationTime = new Date().getTime() + 60 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime);
  };

  const decodeToken = (token) => {
    try {
      const decodedString = atob(token.split(".")[1]);
      const decodedObject = JSON.parse(decodedString);
      return decodedObject;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const styles = {
    container: {
      position: "relative",
      maxWidth: "400px",
      margin: "50px 20px 50px auto",
      padding: "20px",
      boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
      backgroundColor: "rgba(255, 255, 255, 0.7)", // Translucent white background
      borderRadius: "8px",
      textAlign: "center",
      float: "right",
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url("${process.env.PUBLIC_URL}/background.png")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(8px)",
      zIndex: -1,
    },
    heading: {
      fontSize: "28px",
      fontWeight: "700",
      color: "black",
      marginBottom: "20px",
    },
    form: {
      maxWidth: "300px",
      margin: "0 auto",
    },
    label: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#333",
      marginBottom: "8px",
      textAlign: "left",
      display: "block",
    },
    input: {
      height: "40px",
      width: "100%",
      outline: "none",
      border: "1px solid #aaa",
      borderRadius: "6px",
      padding: "0 10px",
      fontSize: "16px",
      marginBottom: "16px",
      transition: "border-color 0.3s ease",
    },
    button: {
      color: "#fff",
      backgroundColor: "#4CAF50",
      borderRadius: "6px",
      padding: "12px",
      cursor: "pointer",
      transition: "all 0.4s ease",
      border: "none",
      outline: "none",
      fontSize: "16px",
    },
    registerLink: {
      color: "#e74c3c",
      textDecoration: "none",
      fontSize: "14px",
      marginTop: "12px",
      display: "block",
      transition: "color 0.4s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}></div>
      {/* This is a A11y Tag */}
      <h2 style={styles.heading}>Welcome to Personal Budget App!</h2>
      {/* This is Semantic HTML tag */}
      <form style={styles.form}>
        <label style={styles.label}>
          Username
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            style={styles.input}
          />
        </label>
        <button type="button" onClick={handleLogin} style={styles.button}>
          Log In
        </button>
      </form>
      <Link to="/register" style={styles.registerLink}>
        New here? Click here to Register
      </Link>
    </div>
  );
};

export default LoginPage;
