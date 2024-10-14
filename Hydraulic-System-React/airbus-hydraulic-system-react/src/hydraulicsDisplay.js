import React from 'react';
import HydraulicChannel from './hydraulicChannel.js';

function HydraulicsDisplay() {
    return (
        <div className='hydraulics-display'>
            <h1 className='hydraulics-title'>HYD</h1>
            <div className='hydraulic-channels'>
                <HydraulicChannel name="GREEN" />
                <HydraulicChannel name="BLUE" />
                <HydraulicChannel name="YELLOW" />
            </div>
        </div>
    );
}

export default HydraulicsDisplay;
