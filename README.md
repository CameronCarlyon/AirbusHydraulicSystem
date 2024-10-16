# Airbus A320 Hydraulic System Recreation
This project features a graphic representation of the Airbus A320 hydraulic system written in React and the Microsoft Flight Simulator SDK.

Both sections of this project aim to provide a realistic representation of the Airbus A320 hydraulic system, offering visual feedback and interactive elements for users to engage with the system.

<img width="800" alt="ECAM-HYD-1" src="https://github.com/user-attachments/assets/55781fd2-51b2-44cb-9852-a8c6b3ddbfb4">

<img width="800" alt="ECAM-HYD-2" src="https://github.com/user-attachments/assets/f3efdeb1-752f-468e-a1a9-6101e27396a3">

# React Application
The React application provides a simulation of the Airbus A320 hydraulic lower ECAM system display, including:
- Visualisation of the three hydraulic channels: Green, Blue, and Yellow.
- System components such as Main System Pumps and Fire Valves.
- Hydraulic reservoir level indicators.
- Real-time pressure displays for each channel.
- Lower ECAM statistics display demonstrating temperature, time and gross weight information.

# Key Components
HydraulicsDisplay
This component serves as the main container for the hydraulic system display, rendering the title and individual hydraulic channels.

HydraulicChannel
This component represents an individual hydraulic channel, including:
- SVG graphics for system components.
- Hydraulic channel pressure display.
- Interactive buttons for system control.
- State management for pump status, fire valve status and reservoir pressure.

TemperatureDisplay, TimerDisplay and WeightDisplay
These components render the lower ECAM display information:
- Temperature Display: Shows Total Air Temperature (TAT) and Static Air Temperature (SAT).
- Timer Display: Displays current Universal Standard Time.
- Weight Display: Shows the Gross Weight of the aircraft.

# HydraulicChannel Component - Additional Information

The HydraulicChannel component represents a single hydraulic channel in the Airbus hydraulic system simulation. It's designed to be reusable, with the specific channel name passed as a prop.

The component uses React's useState hook to manage four pieces of state:

1. **reservoirPressure:** Represents the pressure in the hydraulic reservoir.
2. **psi:** Represents the current pressure in the hydraulic system.
3. **pumpStatus:** Indicates whether the pump is on (1) or off (0).
4. **fireValveStatus:** Indicates whether the fire valve is open (1) or closed (0).

**Effect Hook:**
The component uses a useEffect hook to simulate pressure changes based on the pump status. When the pump is off, the pressure decreases gradually. When it's on, the pressure increases until it reaches a maximum value.

**Rendering:**
The component renders a complex SVG structure that visually represents the hydraulic channel. This includes:

- Hydraulic channel system label.
- A PSI value display.
- An SVG graphic representing the hydraulic system, including:
 - Green arrow.
 - System lines.
 - Main system pump status indicator.
 - Fire valve status indicator (for non-blue channels).
 - Hydraulic reservoir representation.
 
The SVG elements change color based on the status of various components (pump, fire valve) and the current pressure.

**User Interaction:**
The component can include buttons that allows users to:

- Increase or decrease reservoir pressure.
- Toggle the pump status.
- Toggle the fire valve status (for non-blue channels).

These interactions directly modify the component's state, which in turn updates the visual representation.

**Conditional Rendering:**
The component uses conditional rendering to display different SVG elements based on the channel name (BLUE vs. others) and the current status of various components.

**Performance Considerations:**
The use of SVG for graphics allows for smooth scaling and efficient rendering. The component also uses inline styles for dynamic color changes, which can be more performant than class-based styling for frequently changing values.

# Styling
The application uses a custom CSS file (ecam.css) to style the components, ensuring a realistic representation of the ECAM display.
Key styling features include:

- Colour scheme matching the actual ECAM display.
- Responsive design using Flexbox.
- SVG styling for system components.

# Interactivity
The application allows users to interact with the hydraulic system through buttons that update the visual representation in real-time, simulating system behavior:

- Toggle pump status.
- Toggle fire valve status.
- Increase or decrease reservoir pressure.

<img width="800" alt="ECAM-Controls" src="https://github.com/user-attachments/assets/f5900ffc-6582-4f3d-aa43-c87217c018cd">

# Microsoft Flight Simulator SDK Integration
The MSFS integration implements the hydraulic system display within the simulator environment and is set up as a custom instrument for MSFS, replacing the DA-62 backup speed display.

<img width="425" alt="image" src="https://github.com/user-attachments/assets/4b8cb53f-43c4-4a77-a81b-2390bc98fe53">

The drastically different aspect ratio demonstrates the importance of responsive design and how through correct implementation, the application can adapt to a wide range of viewport configurations.

# Key Files:
- AS1000_SpeedBackup.js: Main JavaScript file for the MSFS gauge.
- AS1000_SpeedBackup.html: HTML template for the gauge.
- AS1000_SpeedBackup.css: Styling for the MSFS gauge.

# Functionality
- Renders the hydraulic system display using SVGs similar to the React application.
- Generates random system states, configurations and levels for demonstration purposes.
- Updates the display at regular intervals to simulate real-time changes.

# Noted Missing Functionality
- Power Transfer Unit (PTU) integration on the BLUE hydraulic line.
- Electrical Pumps.
- Ram Air Turbine (RAT) on the BLUE hydraulic line.
- System Labels (1 & 2).

# Conclusion
This project provides a fundamental simulation of the Airbus A320 hydraulic system, both as a standalone web application and as an integration for Microsoft Flight Simulator 2020. It offers a representitive visual representation and interactive elements.
