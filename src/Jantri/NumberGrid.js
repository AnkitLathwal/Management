import React from "react";

const NumberGrid = () => {
  const renderRow = (start, end) => (
    <div className="grid-row">
      {Array.from({ length: end - start + 1 }, (_, i) => (
        <div className="grid-cell" key={start + i}>
          <span>{start + i}</span>
          <input type="text" />
        </div>
      ))}
      <div className="grid-total">= 0</div>
    </div>
  );

  return (
    <div className="number-grid">
      {renderRow(11, 20)}
      {renderRow(21, 30)}
      {renderRow(31, 40)}
      {renderRow(41, 50)}
      {renderRow(51, 60)}
      {renderRow(61, 70)}
      {renderRow(71, 80)}
      {renderRow(81, 90)}
      {renderRow(91, 100)}
      <div className="grid-section">
        <span>B</span>
        {renderRow(1, 10)}
      </div>
      <div className="grid-section">
        <span>A</span>
        {renderRow(1, 10)}
      </div>
    </div>
  );
};

export default NumberGrid;
