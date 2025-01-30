document.getElementById('dateForm').addEventListener('submit', function (e) {
    e.preventDefault(); 
  
    const dateInput = document.getElementById('dateInput').value;
    const resultDiv = document.getElementById('result');
  
   
    if (!/^\d{2}-\d{2}$/.test(dateInput)) {
      resultDiv.innerHTML = '<p class="error">Please enter a valid date in MM-DD format (e.g., 01-31).</p>';
      return;
    }
  

    const [month, day] = dateInput.split('-');
  
    fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const events = data.events;
        if (events.length === 0) {
          resultDiv.innerHTML = '<p>No events found for this date.</p>';
        } else {
          let html = '<h2>Events:</h2>';
          events.forEach((event) => {
            html += `
              <div class="event">
                <p><strong>Year:</strong> ${event.year}</p>
                <p><strong>Event:</strong> ${event.text}</p>
              </div>
            `;
          });
          resultDiv.innerHTML = html;
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        resultDiv.innerHTML = '<p class="error">Failed to fetch data. Please try again later.</p>';
      });
  });
