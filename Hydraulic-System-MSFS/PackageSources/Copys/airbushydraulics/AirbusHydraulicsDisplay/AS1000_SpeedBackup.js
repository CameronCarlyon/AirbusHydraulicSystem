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
      <div class="hydraulic-channel-content">
        <svg width="100" height="377" viewBox="0 0 100 660">
          <polygon points="35,25 65,25 50,5" fill="none" stroke="${fireValveStatus === 0 && !isBlue ? "#ffa500" : (pumpStatus === 0 ? "#ffa500" : "#0ef111")}" stroke-width="4" />
          <line x1="50" y1="25" x2="50" y2="${isBlue ? "350" : "280"}" stroke="${fireValveStatus === 0 && !isBlue ? "#ffa500" : (pumpStatus === 0 ? "#ffa500" : "#0ef111")}" stroke-width="3" />
          <rect x="15" y="${isBlue ? "350" : "280"}" width="70" height="66" fill="#0c0c0c" stroke="${fireValveStatus === 0 && !isBlue ? "#ffa500" : "#0ef111"}" stroke-width="4" />
          ${!isBlue ? `
            <line x1="50" y1="346" x2="50" y2="363" stroke="${fireValveStatus === 0 ? "#ffa500" : "#0ef111"}" stroke-width="3" />
            <circle cx="50" cy="390" r="27" fill="#0c0c0c" stroke="${fireValveStatus === 0 ? "#ffa500" : "#0ef111"}" stroke-width="3" />
            <line x1="${fireValveStatus === 0 ? "23" : "50"}" y1="${fireValveStatus === 0 ? "390" : "363"}" x2="${fireValveStatus === 0 ? "77" : "50"}" y2="${fireValveStatus === 0 ? "390" : "417"}" stroke="${fireValveStatus === 0 ? "#ffa500" : "#0ef111"}" stroke-width="3" />
            <line x1="50" y1="417" x2="50" y2="455" stroke="#0ef111" stroke-width="3" />
          ` : ''}
          ${isBlue ? `<line x1="50" y1="416" x2="50" y2="455" stroke="#0ef111" stroke-width="3" />` : ''}
          <rect x="50" y="455" width="10" height="22" fill="none" stroke="#0ef111" stroke-width="3"/>
          <line x1="50" y1="600" x2="50" y2="455" stroke="white" stroke-width="3" />
          <rect x="50" y="${600 - (isBlue ? 44 : 22)}" width="7" height="${isBlue ? 44 : 22}" fill="none" stroke="#ffa500" stroke-width="3" />
          <line x1="48.5" y1="600" x2="40" y2="600" stroke="#0ef111" stroke-width="3" />
          <line x1="38.5" y1="601.5" x2="38.5" y2="${588 - (reservoirPressure / 40)}" stroke="#0ef111" stroke-width="3" />
          <line x1="38.5" y1="${589.5 - (reservoirPressure / 40)}" x2="51.5" y2="${589.5 - (reservoirPressure / 40)}" stroke="#0ef111" stroke-width="3" />
          <line x1="50.4" y1="${589.1 - (reservoirPressure / 40)}" x2="38.5" y2="${574 - (reservoirPressure / 40)}" stroke="#0ef111" stroke-width="3" />
        </svg>
        <div class="pressure-display">
          <span class="psi-value">${psi}</span>
        </div>
      </div>
    `;
  }

  updateTemperatureDisplay() {
    const temperatureDisplay = document.getElementById("temperature-display");
    if (temperatureDisplay) {
      temperatureDisplay.innerHTML = `
        <div class="temperature-stat">
          <span>TAT</span>
          <span style="color: #0ef111;">${this.totalAirTemperature}</span>
          <span style="color: #15e6e9;">C</span>
        </div>
        <div class="temperature-stat">
          <span>SAT</span>
          <span style="color: #0ef111;">${this.staticAirTemperature}</span>
          <span style="color: #15e6e9;">C</span>
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
        <span style="color: #0ef111;">${hours}</span>
        <span style="color: #15e6e9;">H</span>
        <span style="color: #0ef111;">${minutes}</span>
      `;
    }
  }

  updateWeightDisplay() {
    const weightDisplay = document.getElementById("weight-display");
    if (weightDisplay) {
      weightDisplay.innerHTML = `
        <span>GW</span>
        <span style="color: #0ef111;">${this.grossWeight}</span>
        <span style="color: #15e6e9;">KG</span>
      `;
    }
  }

  updateHydraulicsPage() {
    if (this.hydraulicsPageElement) {
      this.hydraulicsPageElement.innerHTML = `
        <h1 class="hydraulic-page-title">HYD</h1>
        <div class="hydraulic-systems-container" style="background-color: rgba(255,0,0,0.1); border: 1px solid red;">
          <svg viewBox="0 0 100 200" class="hydraulic-system-svg" style="border: 1px solid blue;">
            <!-- Arrow at the top (moved down) -->
            <polygon points="50,15 45,22 55,22" fill="#00FF00" />
            
            <!-- Main hydraulic line (adjusted to connect with the arrow) -->
            <line x1="50" y1="22" x2="50" y2="170" stroke="#00FF00" stroke-width="4" />
          </svg>
        </div>
      `;
    }
  }
}
registerInstrument("simple-glasscockpit-sample", NewAS1000_SpeedBackup);
