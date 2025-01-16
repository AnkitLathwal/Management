import React, { useState } from 'react';

const InputCombination = () => {
  // State to store input values for A and B
  const [labelA, setLabelA] = useState(Array(11).fill(''));
  const [labelB, setLabelB] = useState(Array(11).fill(''));
  const [combinations, setCombinations] = useState([]);

  // Handle changes in input for Label A
  const handleInputChangeA = (index, value) => {
    const newLabelA = [...labelA];
    newLabelA[index] = value;
    setLabelA(newLabelA);
    
    // Automatically copy to corresponding Label B input if 'p' is pressed
    if (value.toLowerCase() === 'p') {
      const newLabelB = [...labelB];
      newLabelB[index] = newLabelA[index];
      setLabelB(newLabelB);
    }
  };

  // Handle changes in input for Label B
  const handleInputChangeB = (index, value) => {
    const newLabelB = [...labelB];
    newLabelB[index] = value;
    setLabelB(newLabelB);
  };

  // Generate combinations from Label A
  const generateCombinations = () => {
    let result = [];
    
    for (let i = 0; i < labelA.length; i++) {
      for (let j = 0; j < labelA.length; j++) {
        result.push(labelA[i] + labelA[j]);
      }
    }
    
    setCombinations(result);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Input Combinations</h3>
      
      {/* Label A Inputs */}
      <div>
        <label>Label A</label>
        <div>
          {labelA.map((value, index) => (
            <input
              key={`A-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleInputChangeA(index, e.target.value)}
              placeholder={`A${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Label B Inputs */}
      <div>
        <label>Label B</label>
        <div>
          {labelB.map((value, index) => (
            <input
              key={`B-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleInputChangeB(index, e.target.value)}
              placeholder={`B${index + 1}`}
            />
          ))}
        </div>
      </div>

      <button onClick={generateCombinations}>Generate Combinations</button>
      
      {/* Display the result in a table */}
      {combinations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Generated Combinations</h4>
          <table border="1" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Combination</th>
              </tr>
            </thead>
            <tbody>
              {combinations.map((combination, index) => (
                <tr key={index}>
                  <td>{combination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InputCombination;
