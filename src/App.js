import React, { useState } from 'react';

function App() {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/gather-data', {  // We'll update this URL later for Azure
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      if (response.ok) {
        setMessage('Data gathered successfully!');
      } else {
        setMessage('Error: ' + await response.text());
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Property Data Gathering PoC</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Address: </label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="123 Main St, City, State"
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
