import './ECAM.css';
import HydraulicsDisplay from './hydraulicsDisplay.js';
import TemperatureDisplay from './temperatureDisplay.js';

function LowerECAM() {
  return (
    <div className="App">
      <HydraulicsDisplay />
      <TemperatureDisplay />
    </div>
  );
}

export default LowerECAM;
