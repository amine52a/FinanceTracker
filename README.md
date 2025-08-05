Angular Finance Project
Project Overview
This is a full-stack finance management application built with Angular for the frontend and Node.js for the backend. It helps users track and manage their finances with ease through a clean and interactive interface.

⚠️ Important Note ⚠️
I made an error while pushing the project files. The frontend and backend code are in separate folders. Please download the frontend and backend folders separately, then place the frontend folder inside the main project directory when setting up.

Features
User Authentication (login/register)

Income and Expense Tracking

Budget Management

Financial Dashboard with charts

Responsive UI for desktop and mobile

Technologies Used
Angular (frontend)

Node.js and Express (backend)

MongoDB (database)

JWT for authentication

Chart.js (for visual reports)

Installation & Setup
Prerequisites
Node.js & npm installed

Angular CLI installed globally

MongoDB setup locally or cloud

Steps
Clone or download the repository.

Download the backend folder and navigate into it:

bash
cd backend
npm install
Download the frontend folder separately and place it inside the main project folder, then navigate into it:

bash
cd frontend
npm install
Create .env file in the backend folder and configure:

Database connection URI

JWT secret key

Start backend server:

bash
cd backend
npm start
Start frontend server:

bash
cd frontend
ng serve
Open your browser at http://localhost:4200 to access the app.
Running the Project
To run the project smoothly, you need to split your terminal into 4 separate terminals to run these parts simultaneously:

Frontend (Angular app)

Backend (Node.js server)

IA Model 1 service

IA Model 2 service

Terminal commands:
Frontend:

bash
cd frontend
npm install      # (only if not done yet)
ng serve
Backend:

bash
cd backend
npm install      # (only if not done yet)
npm start
IA Model 1 service:

bash
cd backend/ia-model1
npm install      # if needed
npm start        # or the specific command you use to launch the first IA model
IA Model 2 service:

bash
cd backend/ia-model2
npm install      # if needed
npm start        # or the specific command for the second IA model
Make sure all four terminals are running at the same time for the app to work correctly, as the frontend communicates with the backend and both IA model services.
Usage
Register or log in

Add and manage your incomes and expenses

Set budgets and track spending

View your financial dashboard with summaries and charts

Contributions
Feel free to submit issues or pull requests for improvements.
