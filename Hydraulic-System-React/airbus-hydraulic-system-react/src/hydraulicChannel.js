import React from 'react';

let psi = 3000;
let fireValveStatus = 1;
let pumpStatus = 0;
// let reservoirPressure = 3000;

function HydraulicChannel({ name }) {
    return (
        <div className="hydraulic-channel">
            <div className="channel-name">{name}</div>
            <svg width="100" height="550" viewBox="0 0 100 550">

                {/* Arrow at the top (outline) */}
                <polygon points="35,20 65,20 50,0" fill="none" stroke="#0ef111" strokeWidth="3" />
                
                {/* PSI value */}
                <text className="psi-value" x="50" y="40" textAnchor="middle" fill="#0ef111" fontSize="14">{psi}</text>
                
                {/* Green vertical line */}
                <line x1="50" y1="20" x2="50" y2="510" stroke="#0ef111" strokeWidth="5" />
                
                {/* White line continuation */}
                <line x1="50" y1="400" x2="50" y2="440" stroke="white" strokeWidth="5" />
                
                <line x1="50" y1="510" x2="50" y2="550" stroke="white" strokeWidth="5" />
                
                {/* Main System Pump Status */}
                {pumpStatus === 1 ? (
                    <>
                        <rect x="20" y="260" width="65" height="60" fill="#0c0c0c" stroke="#0ef111" strokeWidth="5" />
                        <line x1="52.5" y1="260" x2="52.5" y2="320" stroke="#0ef111" strokeWidth="5" />
                    </>
                ) : (
                    <>
                        <rect x="20" y="260" width="65" height="60" fill="#0c0c0c" stroke="#ffa500" strokeWidth="5" />
                        <text x="52.5" y="290" fill="#ffa500" fontSize="24" textAnchor="middle" dominantBaseline="middle">LO</text>
                    </>
                )}

                {/* Fire Valve Status circle */}
                {fireValveStatus === 0 ? (
                    <>
                        <circle cx="50" cy="430" r="25" fill="#0c0c0c" stroke="#0ef111" strokeWidth="3" />
                        <line x1="50" y1="410" x2="50" y2="450" stroke="#0ef111" strokeWidth="3" />
                    </>
                ) : (
                    <>
                        <circle cx="50" cy="430" r="25" fill="#0c0c0c" stroke="#ffa500" strokeWidth="3" />
                        <line x1="25" y1="430" x2="75" y2="430" stroke="#ffa500" strokeWidth="3" />
                    </>
                )}
            </svg>
        </div>
    );
}

export default HydraulicChannel;
