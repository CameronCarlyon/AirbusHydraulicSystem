import React from 'react';

let psi = 3000;
let fireValveStatus = 1;
let pumpStatus = 0;
// let reservoirPressure = 3000;

function HydraulicChannel({ name }) {
    return (
        <div className="hydraulic-channel">
            <div className="channel-name">{name}</div>
            <div className="psi-value">{psi}</div>
            <svg width="100" height="580" viewBox="0 0 100 550">

                {/* Arrow at the top (outline) - Moved up */}
                <polygon points="35,10 65,10 50,-10" fill="none" stroke="#0ef111" strokeWidth="4" />
                
                {/* Green vertical line */}
                <line x1="50" y1="10" x2="50" y2="415" stroke="#0ef111" strokeWidth="3" />
                
                {/* Hydraulic Reservoir */}

                {/* Hydraulic Reservoir Safe Zone */}
                <rect x="50" y="413" width="10" height="20" fill="none" stroke="#0ef111" strokeWidth="3"/>

                {/* White Line - Hydraulic Reservoir */}
                <line x1="50" y1="550" x2="50" y2="415" stroke="white" strokeWidth="3" />

                {/* Empty box with amber outline */}
                <rect x="50" y="530" width="10" height="20" fill="none" stroke="#ffa500" strokeWidth="3" />
                
                {/* Hydraulic Reservoir Indicator - Base */}
                <line x1="48.5" y1="550" x2="40" y2="550" stroke="#0ef111" strokeWidth="3" />

                {/* Hydraulic Reservoir Indicator - Vertical */}
                <line x1="38.5" y1="551.5" x2="38.5" y2="530" stroke="#0ef111" strokeWidth="3" />
                
                {/* Hydraulic Reservoir Indicator - Arrow Base */}
                <line x1="38.5" y1="531.5" x2="51.5" y2="531.5" stroke="#0ef111" strokeWidth="3" />
                
                {/* Hydraulic Reservoir Indicator - Arrow Diagonal */}
                <line x1="50.4" y1="531.1" x2="38.5" y2="518" stroke="#0ef111" strokeWidth="3" />
                
                {/* Main System Pump Status */}
                {pumpStatus === 0 ? (
                    <>
                        <rect x="15" y="260" width="70" height="60" fill="#0c0c0c" stroke="#0ef111" strokeWidth="4" />
                        <line x1="50" y1="260" x2="50" y2="320" stroke="#0ef111" strokeWidth="4" />
                    </>
                ) : (
                    <>
                        <rect x="20" y="260" width="65" height="60" fill="#0c0c0c" stroke="#ffa500" strokeWidth="4" />
                        <text x="52.5" y="290" fill="#ffa500" fontSize="24" textAnchor="middle" dominantBaseline="middle">LO</text>
                    </>
                )}

                {/* Fire Valve Status circle - Moved up */}
                {fireValveStatus === 1 ? (
                    <>
                        <circle cx="50" cy="360" r="25" fill="#0c0c0c" stroke="#0ef111" strokeWidth="3" />
                        <line x1="50" y1="335" x2="50" y2="385" stroke="#0ef111" strokeWidth="3" />
                    </>
                ) : (
                    <>
                        <circle cx="50" cy="360" r="25" fill="#0c0c0c" stroke="#ffa500" strokeWidth="3" />
                        <line x1="25" y1="360" x2="75" y2="360" stroke="#ffa500" strokeWidth="3" />
                    </>
                )}
            </svg>
        </div>
    );
}

export default HydraulicChannel;
