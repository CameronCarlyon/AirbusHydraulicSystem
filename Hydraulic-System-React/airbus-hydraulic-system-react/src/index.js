import React from 'react';
import ReactDOM from 'react-dom/client';
import './ecam.css';
import reportWebVitals from './reportWebVitals';

import HydraulicsDisplay from './hydraulicsDisplay';
import TemperatureDisplay from './temperatureDisplay';
import TimerDisplay from './timerDisplay';
import WeightDisplay from './weightDisplay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='application-container'>
      <HydraulicsDisplay />
      <div className='lower-ecam-stats'>
      <TemperatureDisplay />
      <TimerDisplay />
      <WeightDisplay />
      </div>
    </div>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
