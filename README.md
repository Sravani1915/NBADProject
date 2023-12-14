# Personal Budget Management App

This is a personal budget management application built using React for the front end and Express with MySQL for the backend. The app allows users to manage their budget by providing features such as user authentication, configuring allocated and used budgets, and visualization dashboards.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Available Scripts](#available-scripts)

## Features

- **About Page:** Gives an overview of what to expect from the website from a user point of view.
- **User Authentication:** Includes a login and register page for user authentication.
- **Configuration Page:** Allows users to configure allocated budget and used budgets.
- **Dashboards:** Visualizations like bar and pie graphs and tables to help users track and manage their budget.
- **Logout:** Provides a secure way for users to log out.

## Technologies Used

- **Frontend:**
  - React

- **Backend:**
  - Express.js
  - MySQL

- **Other Technologies:**
  - CORS
  - Body-parser
  - JWT (JSON Web Tokens)
  - Compression

## Getting Started

### Prerequisites

- Node.js
- MySQL database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Sravani1915/NBADProject.git
    ```

2. Install dependencies:

    ```bash
    cd NBADProject
    npm install
    ```

## Configuration

1. Set up a MySQL database and configure the connection details in the backend.
2. Create a `.env` file in the backend directory and add the necessary environment variables.

## Usage

1. Start the backend server:

    ```bash
    cd nbadproject
    node server.js
    ```

2. Start the React app:

    ```bash
    cd nbadproject
    npm start
    ```

3. Open the app in your browser: [http://155.138.211.107:3000](http://155.138.211.107:3000)

## API Endpoints

- `/api/login`: User login endpoint.
- `/api/register`: User registration endpoint.
- `/api/api/get-all-categories`: Endpoint for fetching all categories
- `/api/configure-budget`: Endpoint to configure the budget
- `/api/get-table-data`: Endpoint to get table data
- `/api/enter-used-budget`: Endpoint to get the used budget


## Contributing

Feel free to contribute to the project. Fork the repository, make changes, and submit a pull request.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://155.138.211.107:3000](http://155.138.211.107:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Existing user Credentials : 
Username : sravani ; Password : sravani

