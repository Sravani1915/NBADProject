import React, { useState } from 'react';
import SlidingNotification from './SlidingNotification';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [notification, setNotification] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://155.138.211.107:3002/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstName, lastName }),
      });

      if (response.ok) {
        setNotification('Successfully registered! Please login.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 5000);
      } else {
        const errorResponse = await response.json();
        console.error('Registration failed:', errorResponse.error);
        alert('Registration failed. Please retry');
        setNotification('Registration failed. Please retry.');
      }
    } catch (error) {
      console.error('Error while registering', error);
      alert('Registration failed. Please retry.');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* This is a A11y Tag */}
        <h2 style={styles.heading}>Register Page</h2>
        {/* This is Semantic HTML tag */}
        <form style={styles.form}>
          <label style={styles.label}>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
          </label>

          <label style={styles.label}>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          </label>
          <br />
          <label style={styles.label}>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} />
          </label>
          <br />
          <label style={styles.label}>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} />
          </label>
          <br />
          <button type="button" onClick={handleRegister} style={styles.button}>
            Register
          </button>
        </form>
        <SlidingNotification message={notification} onClose={() => setNotification('')} />
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    height: '100vh',
    backgroundImage: 'url("../public/background.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '400px',
    padding: '20px',
    boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Translucent white background
    borderRadius: '8px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '10px',
  },
  input: {
    height: '40px',
    width: '100%',
    outline: 'none',
    border: 'none',
    padding: '0 10px',
    fontSize: '16px',
    fontWeight: '500',
    borderBottom: '2px solid rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },
  button: {
    marginTop: '20px',
    color: '#fff',
    backgroundColor: '#44b5e6', // Blue button color
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: 'none',
    outline: 'none',
  },
};

export default RegisterPage;
