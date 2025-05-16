import React, { useState } from 'react';

function getFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

function App() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const trimmedName1 = name1.trim();
    const trimmedName2 = name2.trim();

    if (!trimmedName1 || !trimmedName2) {
      setResult('Please Enter valid input');
      return;
    }

    const freq1 = getFrequency(trimmedName1);
    const freq2 = getFrequency(trimmedName2);

    // Process common characters
    for (const char in freq1) {
      if (freq2[char] !== undefined) {
        const min = Math.min(freq1[char], freq2[char]);
        freq1[char] -= min;
        freq2[char] -= min;
      }
    }

    const sum1 = Object.values(freq1).reduce((acc, curr) => acc + curr, 0);
    const sum2 = Object.values(freq2).reduce((acc, curr) => acc + curr, 0);
    const total = sum1 + sum2;
    const modResult = total % 6;

    const resultsMap = {
      0: 'Siblings',
      1: 'Friends',
      2: 'Love',
      3: 'Affection',
      4: 'Marriage',
      5: 'Enemy'
    };

    setResult(resultsMap[modResult]);
  };

  const handleClear = () => {
    setName1('');
    setName2('');
    setResult('');
  };

  return (
    <div>
      <input
        data-testid="input1"
        name="name1"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
        placeholder="Enter first name"
      />
      <input
        data-testid="input2"
        name="name2"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
        placeholder="Enter second name"
      />
      <button
        data-testid="calculate_relationship"
        name="calculate_relationship"
        onClick={handleCalculate}
      >
        Calculate Relationship Future
      </button>
      <button
        data-testid="clear"
        name="clear"
        onClick={handleClear}
      >
        Clear
      </button>
      <h3 data-testid="answer">{result}</h3>
    </div>
  );
}

export default App;