## Description
This app allows users to send SMS using Twilio's Programmable SMS feature. It supports sending SMS to single numbers or groups, viewing messages in a chat interface, creating and managing groups with custom names and numbers, and launching SMS campaigns using CRON scheduling. Users need to provide their active Twilio credentials to send messages.

## Technology Used
- **React**: A popular frontend library for building user interfaces in JavaScript. If you're not familiar with React, you can learn more [here](https://react.dev/).
- **Material UI**: A component library for React that provides a wide range of customizable components with Material Design principles. Learn more [here](https://mui.com/material-ui/getting-started/).
- **Redux**: An industry-standard state management tool for React applications, commonly used for managing complex application states efficiently. Learn more [here](https://redux.js.org/).
- **Redux Toolkit**: An official, opinionated, and optimized toolset for Redux development. Learn more [here](https://redux-toolkit.js.org/).
- **Vite**: A build tool that provides faster development experience with optimized bundling. Learn more [here](https://vitejs.dev/).

## Installation

1. **Download the Project**
   Download the project files from the provided source.

2. **Navigate to the Project Directory**
   In your terminal, navigate to the project directory:

   ```sh
   cd front-end
   ```

3. **Install Dependencies**
   The project uses Yarn as the package manager. If you don't have Yarn installed, you can install it first:

   ```sh
   npm install -g yarn
   ```

   Then, install the project dependencies:

   ```sh
   yarn install
   ```

   *Alternatively, you can use npm by running `npm install`.*

4. **Set Up Environment Variables**
   Create a `.env` file in the root directory and configure it to point to your backend server and other necessary environment variables:

   ```env
   VITE_APP_VERSION="app version number"
   VITE_APP_NODE_ENV="development or production"

   VITE_APP_BASE_NAME=/
   VITE_APP_BASE_URL="your backend base URL"

   VITE_APP_GOOGLE_CLIENT_ID="Google console app client ID"
   ```

5. **Start the Application**
   Run the following command to start the development server:

   ```sh
   yarn start
   ```

   *If you're using npm, you can run `npm run start`.*

---

This guide provides step-by-step instructions for setting up and running the project. If you encounter any issues, ensure all dependencies are installed correctly, and environment variables are set up properly.
