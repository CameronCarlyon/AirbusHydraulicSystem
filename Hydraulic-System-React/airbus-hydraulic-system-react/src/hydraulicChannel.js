import React, { useState, useEffect } from 'react';

function HydraulicChannel({ name }) {
    const [reservoirPressure, setReservoirPressure] = useState(5000);
    const [psi, setPsi] = useState(3000);
    const [pumpStatus, setPumpStatus] = useState(1);
    const [fireValveStatus, setFireValveStatus] = useState(1);
    useEffect(() => {
        let interval;
        if (pumpStatus === 0) {
            interval = setInterval(() => {
                setPsi(prevPsi => Math.max(prevPsi - 50, 0));
            }, 1000);
        } else {
            interval = setInterval(() => {
                setPsi(prevPsi => Math.min(prevPsi + 50, 3000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [pumpStatus]);
    return (
        <div className="hydraulic-channel">
            <div className="channel-name">{name}</div>
            <div className="psi-value" style={{ color: fireValveStatus === 0 ? "#ffa500" : (pumpStatus === 1 ? "#0ef111" : "#ffa500") }}>{Math.round(psi)}</div>
            <svg width="100" height="580" viewBox="0 0 100 550">
                {/* Top Arrow */}
                <polygon points="35,10 65,10 50,-10" fill="none" stroke={fireValveStatus === 0 && name !== "BLUE" ? "#ffa500" : (pumpStatus === 0 ? "#ffa500" : "#0ef111")} strokeWidth="4" />
                
                {/* Green vertical line (upper part) */}
                <line x1="50" y1="10" x2="50" y2="260" stroke={fireValveStatus === 0 && name !== "BLUE" ? "#ffa500" : (pumpStatus === 0 ? "#ffa500" : "#0ef111")} strokeWidth="3" />
                
                {/* Main System Pump Status */}
                {pumpStatus === 1 ? (
                    <>
                        <rect x="15" y={name === "BLUE" ? "320" : "260"} width="70" height="60" fill="#0c0c0c" stroke={fireValveStatus === 0 && name !== "BLUE" ? "#ffa500" : "#0ef111"} strokeWidth="4" />
                        <line x1="50" y1={name === "BLUE" ? "320" : "260"} x2="50" y2={name === "BLUE" ? "380" : "320"} stroke={fireValveStatus === 0 && name !== "BLUE" ? "#ffa500" : "#0ef111"} strokeWidth="4" />
                    </>
                ) : (
                    <>
                        <rect x="15" y={name === "BLUE" ? "320" : "260"} width="70" height="60" fill="#0c0c0c" stroke="#ffa500" strokeWidth="4" />
                        <text x="50" y={name === "BLUE" ? "354" : "294"} fill="#ffa500" fontSize="24" textAnchor="middle" dominantBaseline="middle">LO</text>
                    </>
                )}

                {name !== "BLUE" && (
                    <>
                        {/* Green vertical line above Fire Valve graphic*/}
                        <line x1="50" y1="320" x2="50" y2="335" stroke={fireValveStatus === 0 ? "#ffa500" : "#0ef111"} strokeWidth="3" />

                        {/* Fire Valve Status circle */}
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

                        {/* Green vertical line below Fire Valve graphic*/}
                        <line x1="50" y1="385" x2="50" y2="415" stroke="#0ef111" strokeWidth="3" />
                    </>
                )}

                {name === "BLUE" && (
                    <line x1="50" y1="260" x2="50" y2="415" stroke="#0ef111" strokeWidth="3" />
                )}

                {/* -- Hydraulic Reservoir -- */}

                {/* Hydraulic Reservoir Maximum Quantity */}
                <rect x="50" y={name === "BLUE" ? "413" : "413"} width="7" height={name === "BLUE" ? "30" : "20"} fill="none" stroke="#0ef111" strokeWidth="3"/>
                
                {/* White Line - Hydraulic Reservoir */}
                <line x1="50" y1="550" x2="50" y2="415" stroke="white" strokeWidth="3" />

                {/* Hydraulic Reservoir Minimum Quantity */}
                <rect x="50" y={550 - (name === "BLUE" ? 40 : 20)} width="7" height={name === "BLUE" ? 40 : 20} fill="none" stroke="#ffa500" strokeWidth="3" />
                
                {/* Hydraulic Reservoir Indicator */}
                <line x1="48.5" y1="550" x2="40" y2="550" stroke="#0ef111" strokeWidth="3" />
                <line x1="38.5" y1="551.5" x2="38.5" y2={540 - (reservoirPressure / 40)} stroke="#0ef111" strokeWidth="3" />
                <line x1="38.5" y1={541.5 - (reservoirPressure / 40)} x2="51.5" y2={541.5 - (reservoirPressure / 40)} stroke="#0ef111" strokeWidth="3" />
                <line x1="50.4" y1={541.1 - (reservoirPressure / 40)} x2="38.5" y2={528 - (reservoirPressure / 40)} stroke="#0ef111" strokeWidth="3" />
            </svg>
            <div className='buttons'>
                <button onClick={() => setReservoirPressure(prev => Math.min(prev + 500, 5000))}>Increase Pressure</button>
                <button onClick={() => setReservoirPressure(prev => Math.max(prev - 500, 0))}>Decrease Pressure</button>
                <button onClick={() => setPumpStatus(prev => prev === 1 ? 0 : 1)}>
                Toggle Pump
            </button>
            {name !== "BLUE" && (
                <button onClick={() => setFireValveStatus(prev => prev === 1 ? 0 : 1)}>
                    Toggle Fire Valve
                </button>
            )}
            </div>
        </div>
    );
}

export default HydraulicChannel;

