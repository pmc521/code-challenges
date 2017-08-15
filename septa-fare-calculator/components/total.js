import React from 'react';

const Total = props => {


  return (
    <div>
      <h4>Your fare will cost</h4>
      <h1>${props.total}</h1>
    </div>
  );
}

export default Total;
