import React, {Component, useState} from "react";
import '../styles/App.css';

class App extends Component {
    render() {
         const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const getFrequencyMap = (str) => {
    const map = {};
    for (const char of str) {
      map[char] = (map[char] || 0) + 1;
    }
    return map;
  };

  const processNames = (name1, name2) => {
    if (!name1.trim() || !name2.trim()) {
      return 'Please Enter valid input';
    }

    const freq1 = getFrequencyMap(name1);
    const freq2 = getFrequencyMap(name2);

    // Remove common characters
    for (const char in freq1) {
      if (freq2[char]) {
        const minCount = Math.min(freq1[char], freq2[char]);
        freq1[char] -= minCount;
        freq2[char] -= minCount;

        if (freq1[char] === 0) delete freq1[char];
        if (freq2[char] === 0) delete freq2[char];
      }
    }

    const sum = Object.values(freq1).reduce((a, b) => a + b, 0) +
                Object.values(freq2).reduce((a, b) => a + b, 0);

    const relationships = {
      0: 'Siblings',
      1: 'Friends',
      2: 'Love',
      3: 'Affection',
      4: 'Marriage',
      5: 'Enemy'
    };

    return relationships[sum % 6] || 'Siblings';
  };

  const handleCalculate = () => {
    const relationship = processNames(name1, name2);
    setResult(relationship);
  };

  const handleClear = () => {
    setName1('');
    setName2('');
    setResult('');
  };
        return(
            <div id="main">
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
        Calculate Relationship
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
        )
    }
}


export default App;
