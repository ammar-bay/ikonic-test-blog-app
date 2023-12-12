# Blog Project README

Welcome to the Blog Project! This project is a web application built using the MERN (MongoDB, Express.js, React, Node.js) stack with TypeScript. It leverages Redux Toolkit for state management and RTK Query for efficient data querying and caching.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Features](#features)
6. [Contributing](#contributing)
7. [License](#license)

## Project Overview

The Blog Project is a modern web application designed to manage and display blog posts. It provides users with the ability to view, create, update, and delete blog posts, as well as comment on them. The application utilizes the following technologies to deliver a seamless and responsive user experience:

## Technologies Used

- **MERN Stack**:
  - MongoDB: A NoSQL database for storing blog post data.
  - Express.js: A Node.js framework for building the server-side application.
  - React: A JavaScript library for building the user interface.
  - Node.js: A runtime environment for running server-side JavaScript.
- **TypeScript**: A statically-typed superset of JavaScript that enhances code quality and development experience.
- **Redux Toolkit**: A powerful state management library that simplifies state management in React applications.
- **RTK Query**: A library for data fetching and caching, designed to work seamlessly with Redux Toolkit.

## Project Structure

The project structure is organized for easy navigation and scalability. Here's an overview of the main directories and their purposes:

- **client**: Contains the React client application.
  - **src**: Holds the client-side source code.
    - **components**: Reusable React components.
    - **redux**: Redux store setup, actions, reducers, and selectors.
    - **features**: Features organized using Redux Toolkit, including RTK Query slices.
    - **pages**: Individual pages/routes of the application.
    - **utils**: Utility functions and helpers.
- **server**: Contains the Node.js server application.
  - **src**: Holds the server-side source code.
    - **controllers**: Business logic for handling HTTP requests.
    - **models**: Data models for MongoDB.
    - **routes**: API route definitions.
    - **config**: Configuration settings.
    - **middleware**: Middleware for request handling.
- **shared**: Shared code or types between the client and server.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine:

```bash
# Clone the repository
git clone https://github.com/ammar-bay/ikonic-test-blog-app.git

# Navigate to the project directory
cd blog-project

# Install dependencies for both the client and server
cd client
npm install
cd ../server
npm install

# Configure your MongoDB connection in the server's config/database.ts file.

# Start the server
cd ../server
npm start

# Start the client
cd ../client
npm run dev
```

Open your web browser and access the application at http://localhost:3000.

**Features**

- User authentication and authorization.
- CRUD operations for blog posts.
- Commenting on blog posts.
- Real-time updates using RTK Query caching.
- Responsive design for various screen sizes.
- TypeScript for type safety and improved development experience.

**Contributing**
If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Ensure that your code adheres to the project's coding standards and conventions.
3. Write clear and concise commit messages.
4. Test your changes thoroughly and provide unit tests if applicable.
5. Create a pull request, describing your changes and the problem they solve.
6. Collaborate with the maintainers and address any feedback or code review comments.
