import React, { useEffect } from 'react';

const YourComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.astronomyapi.com/api/v2/bodies/positions?longitude=-84.39733&latitude=33.775867&elevation=1&from_date=2024-03-21&to_date=2024-03-21&time=13%3A46%3A03", {
          method: 'GET',
          headers: {
            'Authorization': 'Basic MTFjYTcwODktNzUyNi00NmVkLWJhNWYtM2U5MTU3YWNmYTA1OmVhYjQ1ZDk1YzNkNWYyMzlhZmE3YzY5ZmMyMGVjNjU2YmU0YWM2ZTUzMzJhODI0YTVhODEzM2Q4NjIxOTU5OTE0ODc2OTk0NDlkNzAxY2JiNzNiMTM5ZDMyNTc3MzQ2MzVmM2Q1OWYwZWE2ZDM0MmUzMWVlYTZjZDBkZGM0YTdiNzljYWY1NWZjNDMxMDZlYzZiZmM2OWNjN2MyZDcxYjRkYjBmNjg4NTc2NjBjYTgxN2E4ZThjZDNkOTYyOGUwYzc4ZWZjNzVkZjgwYjliODY1NTQ1ODQ3ZWQyNmVmZmM0'
          },

        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
     
    </div>
  );
};

export default YourComponent;
