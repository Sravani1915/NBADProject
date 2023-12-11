import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetDetails from '../BudgetDetails/BudgetDetails';

function ConfigurePage({ updateHomePageData }) {
  const [categoryAllocation, setCategoryAllocation] = useState('');
  const [allocated, setAllocated] = useState('');
  const [selectedMonthAllocation, setSelectedMonthAllocation] = useState('January');
  const [selectedYearAllocation, setSelectedYearAllocation] = useState(new Date().getFullYear());
  const [allCategories, setAllCategories] = useState([]);

  // Fetch all categories for the datalist
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get('http://45.76.253.123:3002/api/get-all-categories');
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchAllCategories();
  }, []);

  const handleAllocationSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const allocatedValue = parseFloat(allocated);

    if (isNaN(allocatedValue)) {
      console.error('Invalid value for allocated:', allocated);
      return;
    }

    const budgetData = {
      category: categoryAllocation,
      allocated: allocatedValue,
      month: selectedMonthAllocation,
      year: selectedYearAllocation,
      userId,
    };

    try {
      await axios.post('http://45.76.253.123:3002/api/configure-budget', budgetData);

      if (typeof updateHomePageData === 'function') {
        updateHomePageData();
      }
    } catch (error) {
      console.error('Error configuring budget:', error);
    }

    setCategoryAllocation('');
    setAllocated('');
  };

  // Array of all months
  const months = [
    'Select None',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Styles
  const formStyle = {
    margin: "30px",
    width: '35%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  };

  const formHeaderStyle = {
    marginBottom: '15px',
    color: '#333',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '16px', // Increased font size
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={{ margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Budget Configuration Page</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <form onSubmit={handleAllocationSubmit} style={formStyle}>
          <h3 style={formHeaderStyle}>Allocate Budget</h3>
          <label style={labelStyle}>
            Category:
            <input type="text" list='categoriesAllocatedList' value={categoryAllocation} onChange={(e) => setCategoryAllocation(e.target.value)} style={inputStyle} />
            <datalist id="categoriesAllocatedList">
              {allCategories.length > 0 && allCategories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>
          <label style={labelStyle}>
            Allocated Budget:
            <input type="number" value={allocated} onChange={(e) => setAllocated(e.target.value)} style={inputStyle} />
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <label style={{ ...labelStyle, flex: '1', marginRight: '10px' }}>
              Month:
              <select value={selectedMonthAllocation} onChange={(e) => setSelectedMonthAllocation(e.target.value)} style={{ ...inputStyle, width: '100%' }}>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </label>
            <label style={{ ...labelStyle, flex: '1' }}>
              Year:
              <input type="number" value={selectedYearAllocation} onChange={(e) => setSelectedYearAllocation(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
            </label>
          </div>
          <button type="submit" style={buttonStyle}>Add Budget</button>
        </form>

        {/* Budget Details Component */}
        <div style={{ width: '45%' }}>
          <BudgetDetails />
        </div>
      </div>
    </div>
  );
}

export default ConfigurePage;
