import React from 'react';

let totalAirTemperature = "+18"
let staticAirTemperature = "+13";

function TemperatureDisplay() {
    return (
        <div className='temperature-display'>
            <div className='temperature-stat'>
                <h3>TAT</h3>
                <h3 style={{color: "#0ef111"}}>{totalAirTemperature}</h3>
                <h3 style={{color: "#15e6e9"}}>°C</h3> 
            </div>
            <div className='temperature-stat'>
                <h3>SAT</h3>
                <h3 style={{color: "#0ef111"}}>{staticAirTemperature}</h3>
                <h3 style={{color: "#15e6e9"}}>°C</h3>
            </div>
        </div>
    );
}

export default TemperatureDisplay;
