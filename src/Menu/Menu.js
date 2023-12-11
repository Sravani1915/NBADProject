import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Menu.scss'; // Import the CSS file
import axios from 'axios';
import styled from 'styled-components';

const CustomNavBar = styled.nav`
  color: white;
`;


function Menu() {
  const [userId, setUserId] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const value = localStorage.getItem('userId');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserId(value || '');

    // Fetch user details when userId is available
    if (value) {
      // Replace the following API call with your actual API endpoint to fetch user details
      fetchUserDetails(value);
    }
  }, [value]);

  const fetchUserDetails = async (userId) => {
    try {
      // Replace the following with your actual API endpoint to fetch user details
      const response = await axios.get(`http://45.76.253.123:${3002}/api/users/${userId}`);
      const userData = response.data;

      // Assuming the API response has a "firstname" property
      setUserFirstName(userData.firstname);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserId('');
    setUserFirstName('');
    navigate('/login'); // Navigate directly to the login page
  };

  const isLoginPage = location.pathname === '/login';

  // Check if the current page is the register page
  const isRegisterPage = location.pathname === '/register';

  return (
    /* This is a A11y accessibility*/
    <CustomNavBar className="menu" aria-label="Main menu" itemScope itemType="https://schema.org/SiteNavigationElement">
      <ul>
        {!userId && isLoginPage && (
          <>
            <li>Personal Budget App</li>
          </>
        )}
        {userId && !isRegisterPage && (
          <>
            {!isLoginPage && <li><span className="hello-message">Good to see you, {userFirstName}!</span></li>}
            {/* This is a SEO Tag */}
            {!isLoginPage && <li><Link itemProp="url" to="/aboutpage" tabIndex="2">AboutPage</Link></li>}
            {!isLoginPage && <li><Link itemProp="url" to="/homepage" tabIndex="3">HomePage</Link></li>}
            {!isLoginPage && <li><Link itemProp="url" to="/configuration" tabIndex="3">Configure Budget</Link></li>}
            <li><Link itemProp="url" to="/login" tabIndex="11" onClick={handleLogout}>Logout</Link></li>
          </>
        )}
      </ul>
    </CustomNavBar>
  );
}

export default Menu;
