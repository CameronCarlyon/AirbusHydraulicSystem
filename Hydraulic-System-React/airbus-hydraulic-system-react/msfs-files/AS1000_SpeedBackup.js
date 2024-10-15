class NewAS1000_SpeedBackup extends BaseInstrument {
  constructor() {
    super();
    this.totalAirTemperature = "+18";
    this.staticAirTemperature = "+13";
    this.grossWeight = "122600";
  }

  get templateID() {
    return "AS1000_SpeedBackup";
  }

  connectedCallback() {
    super.connectedCallback();
    this.createHydraulicsDisplay();
    this.createLowerECAMDisplays();

    setInterval(() => {
      this.updateHydraulicChannels();
      this.updateTemperatureDisplay();
      this.updateTimerDisplay();
      this.updateWeightDisplay();
    }, 1000);
  }

  createHydraulicsDisplay() {
    const electricityElement = document.getElementById("Electricity");
    const hydraulicsDisplay = document.createElement("div");
    hydraulicsDisplay.className = "hydraulics-display";
    hydraulicsDisplay.innerHTML = `
      <h1 class="hydraulics-title">HYD</h1>
      <div class="hydraulic-channels">
        <div id="green-channel" class="hydraulic-channel"></div>
        <div class="psi-label">PSI</div>
        <div id="blue-channel" class="hydraulic-channel"></div>
        <div class="psi-label">PSI</div>
        <div id="yellow-channel" class="hydraulic-channel"></div>
      </div>
    `;
    electricityElement.appendChild(hydraulicsDisplay);
  }

  createLowerECAMDisplays() {
    const electricityElement = document.getElementById("Electricity");
    const lowerECAMStats = document.createElement("div");
    lowerECAMStats.className = "lower-ecam-stats";
    lowerECAMStats.innerHTML = `
      <div id="temperature-display" class="temperature-display"></div>
      <div id="timer-display" class="timer-display"></div>
      <div id="weight-display" class="weight-display"></div>
    `;
    electricityElement.appendChild(lowerECAMStats);
  }

  updateHydraulicChannels() {
    const channels = ["green", "blue", "yellow"];
    channels.forEach(channel => {
      const channelElement = document.getElementById(`${channel}-channel`);
      if (channelElement) {
        channelElement.innerHTML = this.createHydraulicChannelSVG(channel);
      }
    });
  }

  createHydraulicChannelSVG(name) {
    const isBlue = name === "blue";
    const pumpStatus = Math.random() > 0.5 ? 1 : 0;
    const fireValveStatus = isBlue ? 1 : (Math.random() > 0.5 ? 1 : 0);
    const reservoirPressure = Math.floor(Math.random() * 5000);
    const psi = Math.floor(Math.random() * 3000);

    return `
      <h2 class="channel-name">${name.toUpperCase()}</h2>
      <svg width="100" height="580" viewBox="0 0 100 550">
        <polygon points="35,10 65,10 50,-10" fill="none" stroke="${fireValveStatus === 0 && !isBlue ? "#ffa500" : (pumpStatus === 0 ? "#ffa500" : "#0ef111")}" stroke-width="4" />
        <line x1="50" y1="10" x2="50" y2="260" stroke="${fireValveStatus === 0 && !isBlue ? "#ffa500" : (pumpStatus === 0 ? "#ffa500" : "#0ef111")}" stroke-width="3" />
        <rect x="15" y="${isBlue ? "320" : "260"}" width="70" height="60" fill="#0c0c0c" stroke="${fireValveStatus === 0 && !isBlue ? "#ffa500" : "#0ef111"}" stroke-width="4" />
        <line x1="50" y1="${isBlue ? "320" : "260"}" x2="50" y2="${isBlue ? "380" : "320"}" stroke="${fireValveStatus === 0 && !isBlue ? "#ffa500" : "#0ef111"}" stroke-width="4" />
        ${!isBlue ? `
          <line x1="50" y1="320" x2="50" y2="335" stroke="${fireValveStatus === 0 ? "#ffa500" : "#0ef111"}" stroke-width="3" />
          <circle cx="50" cy="360" r="25" fill="#0c0c0c" stroke="${fireValveStatus === 0 ? "#ffa500" : "#0ef111"}" stroke-width="3" />
          <line x1="${fireValveStatus === 0 ? "25" : "50"}" y1="${fireValveStatus === 0 ? "360" : "335"}" x2="${fireValveStatus === 0 ? "75" : "50"}" y2="${fireValveStatus === 0 ? "360" : "385"}" stroke="${fireValveStatus === 0 ? "#ffa500" : "#0ef111"}" stroke-width="3" />
        ` : ''}
        ${isBlue ? `<line x1="50" y1="260" x2="50" y2="415" stroke="#0ef111" stroke-width="3" />` : ''}
        <rect x="50" y="413" width="10" height="20" fill="none" stroke="#0ef111" stroke-width="3"/>
        <line x1="50" y1="550" x2="50" y2="415" stroke="white" stroke-width="3" />
        <rect x="50" y="${550 - (isBlue ? 40 : 20)}" width="7" height="${isBlue ? 40 : 20}" fill="none" stroke="#ffa500" stroke-width="3" />
        <line x1="48.5" y1="550" x2="40" y2="550" stroke="#0ef111" stroke-width="3" />
        <line x1="38.5" y1="551.5" x2="38.5" y2="${540 - (reservoirPressure / 40)}" stroke="#0ef111" stroke-width="3" />
        <line x1="38.5" y1="${541.5 - (reservoirPressure / 40)}" x2="51.5" y2="${541.5 - (reservoirPressure / 40)}" stroke="#0ef111" stroke-width="3" />
        <line x1="50.4" y1="${541.1 - (reservoirPressure / 40)}" x2="38.5" y2="${528 - (reservoirPressure / 40)}" stroke="#0ef111" stroke-width="3" />
      </svg>
      <div class="pressure">${psi} PSI</div>
    `;
  }

  updateTemperatureDisplay() {
    const temperatureDisplay = document.getElementById("temperature-display");
    if (temperatureDisplay) {
      temperatureDisplay.innerHTML = `
        <div class="temperature-stat">
          <h3>TAT</h3>
          <h3 style="color: #0ef111">${this.totalAirTemperature}</h3>
          <h3 style="color: #15e6e9">°C</h3>
        </div>
        <div class="temperature-stat">
          <h3>SAT</h3>
          <h3 style="color: #0ef111">${this.staticAirTemperature}</h3>
          <h3 style="color: #15e6e9">°C</h3>
        </div>
      `;
    }
  }

  updateTimerDisplay() {
    const timerDisplay = document.getElementById("timer-display");
    if (timerDisplay) {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      timerDisplay.innerHTML = `
        <span style="color: #0ef111; font-size: 2rem">${hours}</span>
        <span style="color: #15e6e9">H</span>
        <span style="color: #0ef111; font-size: 1.5rem">${minutes}</span>
      `;
    }
  }

  updateWeightDisplay() {
    const weightDisplay = document.getElementById("weight-display");
    if (weightDisplay) {
      weightDisplay.innerHTML = `
        <h3>GW</h3>
        <h3 style="color: #0ef111">${this.grossWeight}</h3>
        <h3 style="color: #15e6e9">LBS</h3>
      `;
    }
  }
}
registerInstrument("simple-glasscockpit-sample", NewAS1000_SpeedBackup);

