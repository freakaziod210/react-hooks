import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function useBackgroundColor({ checkControlled, checkUncontrolled }) {
  useEffect(() => {
    const app = document.querySelector("body");
    if (checkControlled) {
      app.style.backgroundColor = "lime";
    } else {
      if (checkUncontrolled) {
        app.style.backgroundColor = "salmon";
      } else {
        app.style.backgroundColor = "cyan";
      }
    }
    return () => {
      app.style.backgroundColor = "white";
    };
  });
}

function Example() {
  const [checkControlled, setCheckControlled] = useState(false);
  const [checkUncontrolled, setCheckUncontrolled] = useState(false);
  const [count, setCount] = useState(0);

  useBackgroundColor({ checkControlled, checkUncontrolled });

  return (
    <React.Fragment>
      <div>
        <p>Toggle Controlled: {checkControlled.toString().toUpperCase()}</p>
        <input
          type="checkbox"
          checked={checkControlled}
          onChange={() => setCheckControlled(!checkControlled)}
        />
      </div>
      <div>
        <p>Toggle Uncontrolled: {checkUncontrolled.toString().toUpperCase()}</p>
        <input
          type="checkbox"
          onChange={e => setCheckUncontrolled(e.target.checked)}
        />
      </div>
      <div>
        <p>Count: {count}</p>
        <button
          onClick={e => setCount(checkControlled ? count + 1 : count - 1)}
        >
          {checkControlled ? "Increase" : "Decrease"}
        </button>
      </div>
    </React.Fragment>
  );
}

function App() {
  const [view, setView] = useState("Example");

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <nav style={{ paddingRight: 10 }}>
          <a onClick={() => setView("Example")}>One</a>
        </nav>
        <nav>
          <a onClick={() => setView("")}>Two</a>
        </nav>
      </div>
      {view === "Example" ? <Example /> : <span>Nothing to see here!</span>}
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
