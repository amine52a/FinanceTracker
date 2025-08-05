Angular Finance Project 💰📊
Project Overview 🚀
This is a full-stack finance management app built with Angular (frontend) and Node.js (backend).
It helps you track, analyze, and manage your personal or business finances effortlessly.

⚠️ Important Note ⚠️
I made an error while pushing the project files. The frontend and backend code are in separate folders.
Please download the frontend and backend folders separately, then place the frontend folder inside the main project directory when setting up.

Features ✨
🔐 User Authentication (Login/Register)

💸 Income & Expense Tracking

📈 Budget Management

📊 Financial Dashboard with charts

📱 Responsive UI for desktop & mobile

Technologies Used 🛠️
Angular (frontend)

Node.js and Express (backend)

MongoDB (database)

JWT for authentication

Chart.js (for visual reports)

Installation & Setup 🖥️
Prerequisites
Node.js & npm installed

Angular CLI installed globally

MongoDB setup locally or cloud

Steps
Clone or download the repository.

Download the backend folder and navigate into it:

bash
Copier
Modifier
cd backend
npm install
Download the frontend folder separately and place it inside the main project folder, then navigate into it:

bash
Copier
Modifier
cd frontend
npm install
Create a .env file in the backend folder and configure:

Database connection URI

JWT secret key

Start the backend server:

bash
Copier
Modifier
cd backend
npm start
Start the frontend server:

bash
Copier
Modifier
cd frontend
ng serve
Open your browser at http://localhost:4200 to access the app.

Running the Project 🚀
To run the project smoothly, open 4 separate terminals and run these parts simultaneously:

1️⃣ Frontend (Angular app)
2️⃣ Backend (Node.js server)
3️⃣ IA Model 1 service (FastAPI text generation)
4️⃣ IA Model 2 service (Flask linear regression)

🖥️ Terminal Commands to Run the Project
1️⃣ Frontend (Angular)
bash
Copier
Modifier
cd frontend
npm install      # (only if dependencies are not installed yet)
ng serve
2️⃣ Backend (Node.js)
bash
Copier
Modifier
cd backend
npm install      # (only if dependencies are not installed yet)
npm start
3️⃣ IA Model 1 Service (FastAPI - Text Generation)
bash
Copier
Modifier
cd backend/ia-model1
pip install fastapi "uvicorn[standard]" transformers torch  # (run once if needed)
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
4️⃣ IA Model 2 Service (Flask - Linear Regression)
bash
Copier
Modifier
cd backend/ia-model2
pip install flask scikit-learn numpy    # (run once if needed)
python app.py
⚠️ Important: Make sure all four terminals are running at the same time to allow proper communication between the frontend, backend, and the two IA model services.

📝 Usage
This finance management app helps you take control of your finances with ease. Here’s how to get started and what you can do:

1. 🆕 Register or 🔐 Log In
Create a new account with your email and password or log in if you already have one.

Your data is saved securely and accessible only to you. 🔒

2. ➕ Add and 🛠️ Manage Your Financial Data
Add income 💵 and expense 💸 entries with details like amount, date, and category (e.g., salary, groceries, utilities).

Edit ✏️ or delete 🗑️ any existing entries to keep your records accurate.

Categorize 📂 your transactions for better organization and reporting.

3. 📊 Set Budgets and Track Spending
Define monthly or custom budgets 📅 for different categories to control your spending.

Receive alerts ⚠️ or visual cues if you’re close to exceeding your budget.

Adjust budgets 🔄 anytime as your financial goals evolve.

4. 📈 View Your Financial Dashboard
Access a comprehensive dashboard summarizing your financial health.

View charts 📉📊 and graphs that show your income vs. expenses over time.

Analyze spending patterns and budget adherence with interactive reports.

Use insights 💡 to make smarter financial decisions.

5. 🤖 AI-Powered Insights and Predictions
Benefit from AI modules that generate financial advice or predict future trends based on your data.

The FastAPI service provides text-based guidance and explanations. 📜

The Flask service predicts future revenue or expenses using linear regression models. 📈

🤝 Contributions
Feel free to submit issues or pull requests for improvements, bug fixes, or new features!

