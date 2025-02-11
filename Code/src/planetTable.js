import React, { useState, useEffect } from 'react';
import './planetTable.css';

// Import planet images
import mercuryImage from './images/mercury.png';
import venusImage from './images/venus.png';
import marsImage from './images/mars.png';
import jupiterImage from './images/jupiter.png';
import saturnImage from './images/saturn.png';
import uranusImage from './images/uranus.png';
import neptuneImage from './images/neptune.png';
import sunImage from './images/sun.png';
import moonImage from './images/moon.png';
import plutoImage from './images/pluto.png';
import earthImage from './images/earth.png';

const PlanetTable = ({ latitude, longitude }) => {
  // State to store table data and most visible planet
  const [tableData, setTableData] = useState([]);
  const [mostVisiblePlanet, setMostVisiblePlanet] = useState('');

  // Fetch data based on latitude and longitude
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.astronomyapi.com/api/v2/bodies/positions?longitude=${longitude}&latitude=${latitude}&elevation=1&from_date=2024-03-21&to_date=2024-03-21&time=13%3A46%3A03`, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic MTFjYTcwODktNzUyNi00NmVkLWJhNWYtM2U5MTU3YWNmYTA1OmVhYjQ1ZDk1YzNkNWYyMzlhZmE3YzY5ZmMyMGVjNjU2YmU0YWM2ZTUzMzJhODI0YTVhODEzM2Q4NjIxOTU5OTE0ODc2OTk0NDlkNzAxY2JiNzNiMTM5ZDMyNTc3MzQ2MzVmM2Q1OWYwZWE2ZDM0MmUzMWVlYTZjZDBkZGM0YTdiNzljYWY1NWZjNDMxMDZlYzZiZmM2OWNjN2MyZDcxYjRkYjBmNjg4NTc2NjBjYTgxN2E4ZThjZDNkOTYyOGUwYzc4ZWZjNzVkZjgwYjliODY1NTQ1ODQ3ZWQyNmVmZmM0'
          },
        });
        const data = await response.json();
        setTableData(data.data.table.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  // Object to map planet names to their respective images
  const planetImages = {
    Mercury: mercuryImage,
    Venus: venusImage,
    Mars: marsImage,
    Jupiter: jupiterImage,
    Saturn: saturnImage,
    Uranus: uranusImage,
    Neptune: neptuneImage,
    Sun: sunImage,
    Moon: moonImage,
    Pluto: plutoImage,
    Earth: earthImage
  };

  // Determine the most visible planet based on altitude
  useEffect(() => {
    const getMostVisiblePlanet = () => {
      let mostVisible = '';
      let maxAltitude = -Infinity;

      tableData.forEach(rowData => {
        const { name, position } = rowData.cells[0];
        const altitude = position.horizontal.altitude.degrees;

        if (altitude > maxAltitude) {
          maxAltitude = altitude;
          mostVisible = name;
        }
      });

      setMostVisiblePlanet(mostVisible);
    };

    if (tableData.length > 0) {
      getMostVisiblePlanet();
    }
  }, [tableData]);

  return (
    <div>
      <h2 className='h2table'>Astronomy Table</h2>
      {/* Display the most visible planet */}
      {mostVisiblePlanet && (
        <p className='mostVisible'>The Most Visible Planet Today is: {mostVisiblePlanet}</p>
      )}
      {/* Table to display planet data */}
      <table>
        <thead>
          <tr>
            <th>Object</th>
            <th>Distance (AU)</th>
            <th>Altitude (Degrees)</th>
            <th>Azimuth (Degrees)</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through table data to render rows */}
          {tableData.map((rowData, index) => (
            <tr key={index}>
              <td>{rowData.cells[0].name}</td>
              <td>{rowData.cells[0].distance.fromEarth.au}</td>
              <td>{rowData.cells[0].position.horizontal.altitude.degrees}</td>
              <td>{rowData.cells[0].position.horizontal.azimuth.degrees}</td>
              <td>
                {/* Render planet images dynamically */}
                {rowData.cells[0].name in planetImages && (
                  <img src={planetImages[rowData.cells[0].name]} alt={rowData.cells[0].name} width="100" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanetTable;
