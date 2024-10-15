class NewAS1000_SpeedBackup extends BaseInstrument {
  constructor() {
    super();
    this.totalAirTemperature = "+18";
    this.staticAirTemperature = "+13";
    this.grossWeight = "122600";
    this.temperatureDisplayElement = null;
    this.grossWeightDisplayElement = null;
    this.clockDisplayElement = null;
    this.hydraulicsPageElement = null;
  }

  get templateID() {
    return "AS1000_SpeedBackup";
  }

  Init() {
    super.Init();
  }

  connectedCallback() {
    super.connectedCallback();
    this.createECAMDisplay();
    this.createLowerECAMDisplays();

    // Update displays every second
    setInterval(() => {
      this.updateTemperatureDisplay();
      this.updateClockDisplay();
      this.updateGrossWeightDisplay();
      this.updateHydraulicsPage();
    }, 1000);
  }

  createECAMDisplay() {
    const electricityElement = document.getElementById("Electricity");

    // Create ECAM Hydraulics page container
    this.hydraulicsPageElement = document.createElement("div");
    this.hydraulicsPageElement.className = "hydraulics-page";
    electricityElement.appendChild(this.hydraulicsPageElement);

    // Initial update of the Hydraulics page
    this.updateHydraulicsPage();
  }

  createLowerECAMDisplays() {
    const electricityElement = document.getElementById("Electricity");

    // Create lower ECAM display container
    const lowerECAMContainer = document.createElement("div");
    lowerECAMContainer.className = "lower-ecam-container";
    electricityElement.appendChild(lowerECAMContainer);

    // Create and append Temperature Display
    this.temperatureDisplayElement = document.createElement("div");
    this.temperatureDisplayElement.className = "temperature-display";
    lowerECAMContainer.appendChild(this.temperatureDisplayElement);

    // Create and append Clock Display
    this.clockDisplayElement = document.createElement("div");
    this.clockDisplayElement.className = "clock-display";
    lowerECAMContainer.appendChild(this.clockDisplayElement);

    // Create and append Gross Weight Display
    this.grossWeightDisplayElement = document.createElement("div");
    this.grossWeightDisplayElement.className = "gross-weight-display";
    lowerECAMContainer.appendChild(this.grossWeightDisplayElement);

    this.updateTemperatureDisplay();
    this.updateClockDisplay();
    this.updateGrossWeightDisplay();
  }

  updateTemperatureDisplay() {
    if (this.temperatureDisplayElement) {
      this.temperatureDisplayElement.innerHTML = `
        <div class="temperature-content">
          <span class="label" style="color: #FFFFFF;">TAT:</span>
          <span class="value" style="color: #33b752;">${this.totalAirTemperature}</span>
          <span class="unit" style="color: #11acdd;">°C</span>
        </div>
        <div class="temperature-content">
          <span class="label" style="color: #FFFFFF;">SAT:</span>
          <span class="value" style="color: #33b752;">${this.staticAirTemperature}</span>
          <span class="unit" style="color: #11acdd;">°C</span>
        </div>
      `;
    }
  }

  updateClockDisplay() {
    if (this.clockDisplayElement) {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      
      this.clockDisplayElement.innerHTML = `
        <div class="clock-content">
          <span class="value" style="color: #33b752; font-size: 1.2em;">${hours}</span>
          <span class="unit" style="color: #11acdd;">H</span>
          <span class="value" style="color: #33b752;">${minutes}</span>
        </div>
      `;
    }
  }

  updateGrossWeightDisplay() {
    if (this.grossWeightDisplayElement) {
      this.grossWeightDisplayElement.innerHTML = `
        <div class="gross-weight-content">
          <span class="label" style="color: #FFFFFF;">GW:</span>
          <span class="value" style="color: #33b752;">${this.grossWeight}</span>
          <span class="unit" style="color: #11acdd;">KG</span>
        </div>
      `;
    }
  }

  updateHydraulicsPage() {
    if (this.hydraulicsPageElement) {
      this.hydraulicsPageElement.innerHTML = `
        <h1 class="hydraulic-page-title">HYD</h1>
        <div class="hydraulic-systems-container" style="background-color: rgba(255,0,0,0.1); border: 1px solid red;">
          <svg viewBox="0 0 100 300" class="hydraulic-system-svg" style="border: 1px solid blue;">
            <!-- Main hydraulic line -->
            <line x1="50" y1="20" x2="50" y2="280" stroke="#00FF00" stroke-width="4" />
            
            <!-- Arrow at the top -->
            <polygon points="50,10 45,20 55,20" fill="#00FF00" />
          </svg>
        </div>
      `;
    }
  }
}

registerInstrument("simple-glasscockpit-sample", NewAS1000_SpeedBackup);
console.log("Hello world");
