# Full-Stack Heart Attack Prediction Project

This repository contains a full-stack application with a **React frontend**, **Node.js backend**, **Flask ML backend**, and **SQL database**.  
The project allows users to input health data and receive heart attack risk predictions.

---

## Project Structure

project/
- frontend/ # React application
- backend/ # Node.js API
- ml_backend/ # Flask ML application and jupyter train code
- db/ # SQL databse



## Features

- User registration and login (backend)
- Heart attack risk prediction using ML model (ml_backend)
- Database storage for users and predictions (db)
- Interactive UI (frontend)

---

## Installation & Running Locally

1. Clone the repository:

bash
git clone https://github.com/Athul2530/user_creation.git
Install dependencies and run each part:

- Frontend (React)
- cd frontend
- npm install
- npm start


Backend (Node.js)
- cd backend
- npm install
- npm run serve

ML Backend (Flask)
- cd ml_backend
- python -m venv venv        # optional
- source venv/bin/activate   # Windows: venv\Scripts\activate
- pip install -r requirements.txt
- python app.py

Usage
- Open http://localhost:3000 in your browser (frontend).

Interact with the application; backend and ml_backend handle logic and communicate with the database.

Technologies Used
- React (frontend)

- Node.js / Express (backend)

- Python / Flask (ml_backend)

- MySQL database
