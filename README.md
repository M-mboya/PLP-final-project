Aquafarm Sensor Dashboard

A MERN stack project that simulates and monitors water and farming sensor data. This system is designed to help farmers and agronomists track soil moisture, water levels, and temperature, enabling better irrigation management and sustainable farming practices.

Essence of the Project

Agriculture and water management are critical for sustainable food production. This project demonstrates how IoT-inspired sensor data can be used to monitor soil and water conditions in real time, even in a simulated environment. By visualizing and simulating sensor data, farmers can:

Understand soil moisture trends for irrigation scheduling

Monitor water levels to avoid over- or under-watering

Track temperature for optimal crop growth

Make data-driven decisions for sustainable farming

This project emphasizes the importance of digital agriculture and smart water management, supporting the Sustainable Development Goals (SDGs) related to clean water and responsible agriculture.

Features

Simulate Sensor Data: Generate random sensor readings for soil moisture, temperature, and water level.

View Sensor Data: Fetch and display the latest sensor data from MongoDB.

REST API: Backend built with Express.js and MongoDB.

React Frontend: Interactive dashboard for visualization.

Tech Stack

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Other: Axios (for API calls), CORS

Project Structure
Aquafarm project/
│
├─ BACKEND/
│   ├─ controllers/
│   │   └─ sensorController.js
│   ├─ models/
│   │   └─ sensorModel.js
│   ├─ routes/
│   │   └─ sensorRoutes.js
│   ├─ server.js
│   └─ .env
│
├─ FRONTEND/
│   ├─ src/
│   │   ├─ api/
│   │   │   └─ sensorsApi.js
│   │   ├─ components/
│   │   ├─ App.jsx
│   │   ├─ main.jsx
│   │   └─ index.css
│   └─ package.json
│
└─ README.md

Installation
Backend

Navigate to the backend folder:

cd "Aquafarm project/BACKEND"


Install dependencies:

npm install


Create a .env file with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/aquafarm
JWT_SECRET=mysecretkey


Start the backend:

npm run dev


Backend will run on http://localhost:5000
.

Frontend

Navigate to the frontend folder:

cd "Aquafarm project/FRONTEND"


Install dependencies:

npm install


Start the frontend:

npm run dev


Frontend will run on http://localhost:5174
 (or the next available port).

API Endpoints
Sensors
Method	Endpoint	Description
GET	/api/sensors	Fetch all sensor data
POST	/api/sensors/simulate	Simulate and save random sensor data
Usage

Open the frontend in your browser.

Click Simulate Sensor Data to generate a new reading.

View the latest sensor readings on the dashboard.

Repeat simulations to analyze trends and patterns in soil moisture, temperature, and water level.

Relevance to SDGs

This project contributes to the following Sustainable Development Goals:

SDG 2: Zero Hunger – by improving agriculture efficiency.

SDG 6: Clean Water and Sanitation – by promoting smart water use in farming.

SDG 12: Responsible Consumption and Production – by reducing water waste in agriculture.

License

This project is open-source and free to use.