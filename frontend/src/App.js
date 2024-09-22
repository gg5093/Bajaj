import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [inputJson, setInputJson] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { label: "Numbers", value: "numbers" },
    { label: "Alphabets", value: "alphabets" },
    { label: "Highest Lowercase Alphabet", value: "highest_lowercase_alphabet" },
  ];

  useEffect(() => {
    document.title = "RA2111027010048";
  }, []);

  const handleInputChange = (event) => {
    setInputJson(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(inputJson);
      const result = await axios.post('https://backend-bfhl-orpin.vercel.app/api/bfhl', jsonData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
      setResponse(result.data);
    } catch (error) {
      alert('Invalid JSON input or API error');
      console.error(error);
    }
  };

  const handleMultiSelectChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;
    
    return (
      <div>
        <h3>Filtered Response:</h3>
        {selectedOptions.includes("numbers") && (
          <p>Numbers: {JSON.stringify(response.numbers)}</p>
        )}
        {selectedOptions.includes("alphabets") && (
          <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
        )}
        {selectedOptions.includes("highest_lowercase_alphabet") && (
          <p>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter JSON Input:
          <textarea
            value={inputJson}
            onChange={handleInputChange}
            rows="5"
            cols="50"
            placeholder='{ "data": ["A", "B", "C", "z"] }'
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h3>Raw Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>

          <h3>Filter the response:</h3>
          {options.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                value={option.value}
                onChange={handleMultiSelectChange}
              />
              {option.label}
            </label>
          ))}
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
