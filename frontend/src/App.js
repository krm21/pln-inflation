import './App.css';
import { useState, useEffect } from 'react';

// Object.keys(kek).map(x=>Number.parseInt(x)).sort((x, y)=>y-x)

function convertToPast(todayAmount, month, year, data){

}

function convertToToday(pastAmount, month, year, data){

}

function App() {
  const [inflationData, setInflationData] = useState([]);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setInflationData(data);
    });
  }, []);

  return (
    <div className="App">
      <h5>{inflationData}</h5>
    </div>
  );
}

export default App;
