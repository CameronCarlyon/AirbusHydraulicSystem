import React, { useState, useEffect } from 'react';

function TimerDisplay() {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setHours(String(now.getUTCHours()).padStart(2, '0'));
            setMinutes(String(now.getUTCMinutes()).padStart(2, '0'));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='timer-display'>
            <span style={{ color: "#0ef111", fontSize: "2rem" }}>{hours}</span>
            <span style={{ color: "#15e6e9" }}>H</span>
            <span style={{ color: "#0ef111", fontSize: "1.5rem" }}>{minutes}</span>
        </div>
    );
}

export default TimerDisplay;
