AAquafarm Sensor Dashboard

A full-stack MERN (MongoDB, Express.js, React, Node.js) project that simulates and monitors aquaculture and smart farming sensor data. This system helps farmers and researchers track soil moisture,oxygen level, PH level, temperature, and fish count, promoting better irrigation management and sustainable aquaculture practices.

🌱 Essence of the Project

Water and agriculture management are central to sustainable food production.
The Aquafarm Sensor Dashboard demonstrates how IoT-inspired sensor data can be simulated and visualized in real time to improve decisions in agriculture and aquaculture systems.

Through this platform, users can:

📊 Visualize sensor trends such as soil moisture and temperature over time.

💧 Monitor water levels to prevent over- or under-watering.

🐟 Simulate aquaculture data, including fish count and tank environment conditions.

🌍 Support sustainable farming through data-driven insights aligned with the UN SDGs.

⚙️ Features

✅ Simulate Sensor Data — Randomly generate sensor readings for soil moisture, water level, and temperature.
✅ Real-Time Dashboard — Display the latest data with dynamic React charts.
✅ RESTful API — Backend endpoints to create, read, and simulate sensor data.
✅ MongoDB Integration — Store and retrieve sensor readings for analysis.
✅ Responsive UI — Built with Tailwind CSS for a clean, mobile-friendly interface.

🧰 Tech Stack
Layer	Technology
Frontend	React.js, Vite, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB / MongoDB Atlas
API Calls	Axios
Deployment	Render (Backend), Netlify/Vercel (Frontend)
📁 Project Structure
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

🧑‍💻 Installation
🖥️ Backend Setup

Navigate to the backend folder:

cd "Aquafarm project/BACKEND"


Install dependencies:

npm install


Create a .env file with the following values:

PORT=5000
MONGO_URI=mongodb://localhost:27017/aquafarm
JWT_SECRET=mysecretkey


Start the backend:

npm run dev


The backend runs on http://localhost:5000

💻 Frontend Setup

Navigate to the frontend folder:

cd "Aquafarm project/FRONTEND"


Install dependencies:

npm install


Start the frontend:

npm run dev


The frontend runs on http://localhost:5174
 (or next available port)

🌐 API Endpoints
Method	Endpoint	Description
GET	/api/sensors	Fetch all sensor data
POST	/api/sensors/simulate	Generate and save simulated sensor data
🚀 Usage

Start both frontend and backend servers.

Open the dashboard in your browser.

Click "Simulate Sensor Data" to generate readings.

View the latest soil moisture, temperature, and water level data in the chart.

Continue simulating to observe data trends and patterns.

🌏 Relevance to the SDGs

This project supports the following UN Sustainable Development Goals (SDGs):

SDG 2 – Zero Hunger: Enhancing agricultural productivity through data-driven insights.

SDG 6 – Clean Water and Sanitation: Encouraging efficient water management.

SDG 12 – Responsible Consumption and Production: Reducing resource waste in aquaculture.

📜 License

This project is open-source and free to use for educational and research purposes.