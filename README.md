# CAPTCHA Solver with Coin Reward System

This is a simple React application that allows users to solve CAPTCHAs and earn coins. The application communicates with a backend server to fetch CAPTCHAs, verify user inputs, and provide a coin balance update. Users are rewarded with coins for successfully solving CAPTCHAs, with penalties for incorrect attempts. Additionally, a "Refer & Earn" feature is included for extra rewards.

## Features

- **Captcha Generation**: Fetches a new CAPTCHA for the user to solve.
- **Coin Reward System**: Users earn coins for solving CAPTCHAs correctly, with penalties for incorrect answers.
- **Timer**: A countdown timer is provided for solving the CAPTCHA.
- **Refer & Earn**: A section for users to refer others and earn rewards.
- **Coin Balance Display**: Displays the user's current coin balance.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Ant Design**: A popular React UI framework for styling and components.
- **React Icons**: For incorporating icons in the application.
- **Axios**: To make HTTP requests to the backend server.
- **Environment Variables**: To store backend URLs and other sensitive data.

## Setup

1. Clone the Repository
- Clone this repository to your local machine:
git clone https://github.com/ayush7078/CAPTCHA-Solver-Frontend.git

2. Install Dependencies
- Navigate to the project directory and install the dependencies:
cd CAPTCHA-Solver-Frontend
npm install

3. Configure Environment Variables
- Create a .env file in the root of the project and add the following environment variables:

REACT_APP_BACKEND_URL= http://localhost:5000/api

Replace your-backend-url with the actual URL of your backend API.

4. Start the Development Server
- To run the application in development mode, use the following command:

npm start
The app should now be available at http://localhost:3000.

# Usage
1. Solve CAPTCHA: Enter the CAPTCHA text provided in the box and click "Submit". You will earn coins for a correct answer, and penalties will be deducted for wrong answers.

2. Timer: You have 15 seconds to solve each CAPTCHA. Once the time runs out, you can skip the CAPTCHA and get a new one.

3. Refer & Earn: Use the "Refer & Earn" button to refer others and earn rewards.


## Structure
- src/components/Captcha.js: The component responsible for rendering the CAPTCHA and handling user interaction.
- src/App.js: The main app file that contains the layout and includes the Captcha component.
public/index.html: The HTML template for the React application.
- src/index.js: The entry point for the React application.


# API Endpoints
This application communicates with the following backend API endpoints:

1. GET /captcha: Fetches a new CAPTCHA.
2. GET /user/coins: Fetches the user's current coin balance.
3. POST /captcha/verify: Verifies the user's answer to the CAPTCHA.


# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements
1. Ant Design for providing the UI components.
2. React for being an amazing library.
3. React Icons for providing easy-to-use icons.
4. Axios for making HTTP requests simple.