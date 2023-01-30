import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState({message: '', link: ''});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:5001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    .then((res) => res.json())
    .then((data) => setResponse({message: data.message, link: data.link}));
    
  };

  return (
    <div className="App">
      <p>What do you want to listen to?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {response.message && <p>{response.message}</p>}
      {response.link != '' && response.link != "No match found" ? <a href={response.link} target="_blank">Listen on Spotify!</a> : response.message && <p>Sorry, couldn't find a match on Spotify :(</p>}
    </div>
  );
}

export default App;

