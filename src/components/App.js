import React, { useState } from 'react';

const App = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const createFrequencyMap = (str) => {
    const map = {};
    for (const char of str) {
      map[char] = (map[char] || 0) + 1;
    }
    return map;
  };

  const calculateRelationship = () => {
    if (name1.trim() === '' || name2.trim() === '') {
      setResult('Please Enter valid input');
      return;
    }

    const map1 = createFrequencyMap(name1);
    const map2 = createFrequencyMap(name2);

    // Remove common characters
    Object.keys(map1).forEach((char) => {
      if (map2[char] !== undefined) {
        const min = Math.min(map1[char], map2[char]);
        map1[char] -= min;
        map2[char] -= min;
      }
    });

    const sum = 
      Object.values(map1).reduce((a, b) => a + b, 0) +
      Object.values(map2).reduce((a, b) => a + b, 0);
    
    const modResult = sum % 6;
    
    switch (modResult) {
      case 0: setResult('Siblings'); break;
      case 1: setResult('Friends'); break;
      case 2: setResult('Love'); break;
      case 3: setResult('Affection'); break;
      case 4: setResult('Marriage'); break;
      case 5: setResult('Enemy'); break;
      default: setResult('');
    }
  };

  const handleClear = () => {
    setName1('');
    setName2('');
    setResult('');
  };

  return (
    <div>
      <h3>Calculate Relationship</h3>
      <input
        data-testid="input1"
        name="name1"
        value={name1}
        onChange={(e) => {
          setName1(e.target.value);
          setResult(''); // Clear result when typing
        }}
        placeholder="Enter first name"
      />
      <input
        data-testid="input2"
        name="name2"
        value={name2}
        onChange={(e) => {
          setName2(e.target.value);
          setResult(''); // Clear result when typing
        }}
        placeholder="Enter second name"
      />
      <button
       style={{color:"blue"}}
        data-testid="calculate_relationship"
        name="calculate_relationship"
        onClick={calculateRelationship}
      >
        Calculate Relationship Future
      </button>
      <button
      style={{color:"blue"}}
        data-testid="clear"
        name="clear"
        onClick={handleClear}
      >
        Clear
      </button>
      {result && <h3 data-testid="answer">{result}</h3>}
    </div>
  );
};

export default App;