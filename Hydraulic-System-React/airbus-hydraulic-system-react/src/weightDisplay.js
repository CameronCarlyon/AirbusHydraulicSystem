import React from 'react';

let grossWeight = "122600";

function WeightDisplay() {
    return (
        <div className='temperature-stat'>
            <h3>GW</h3>
            <h3 style={{color: "#0ef111"}}>{grossWeight}</h3>
            <h3 style={{color: "#15e6e9"}}>LBS</h3>
        </div>
    );
}

export default WeightDisplay;
