// Counter.js
import React from "react";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 data-testid="count">{count}</h1>
      {count === 10 && <p data-testid="message">¡Has alcanzado 10!</p>}
      <button data-testid="increment" onClick={() => setCount(count + 1)}>Increment</button>
      <button data-testid="decrement" onClick={() => setCount(count > 0 ? count - 1 : 0)}>Decrement</button>
    </div>
  );
};

export default Counter;