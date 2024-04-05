# Log Watcher

[Log Watcher](https://multyfi-fe.vercel.app/) This application implements a real-time log watching solution using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to monitor a log file hosted on a remote machine and view updates as they occur without needing to refresh the page

<Br/>

# Table of Contents

- [Features](#features)
- [Components](#components)
- [Technologies Used](#tech-stack)
- [Installation](#setup)
- [Usage](#usage)
- [Optimization](#optimization)
- [Working Model Screenshots]()

<a id="features"></a>

# Features
- Real-time streaming of log file updates.
- Accessible via a web-based client.
- Automatically updates with new log entries without page refresh.
- Optimized for large log files.
- Handles multiple clients simultaneously.

<a id="components"></a>

# Components

### Server-side Program:

- Monitors the specified log file.
- Streams updates to connected clients.
- Implemented using Node.js with Express.js.

### Web-based Client:

- Displays log file updates in real-time.
- Shows the last 10 lines upon initial load.
- Continuously updates with new log entries.
- Implemented using React.js.

<a id="tech-stack"></a>

# Tech Stack

- ReactJs
- NodeJs
- ExpressJs
- MongoDB

    ### *Libraries Used*

- WebSocket (for real-time communication)
- React Router (for client-side routing)
- Bootstrap (for UI components)
- Axios (for making HTTP requests)

<a id="setup"></a>

# Project Setup Guide

## Frontend

1. Clone multyfi-fe repo and install dependencies

   sh
   git clone https://github.com/garvit1166/multyfi-fe
   npm i
   

2. Make .env file
    sh
    REACT_APP_BASE_URL=http://localhost:8080
    REACT_APP_SOCKET_URL=ws://localhost:8080
    

3. Start the react app

   sh
   npm start
   

## Backend

1. Clone multyfi-be repo and install dependencies
   sh
   git clone https://github.com/garvit1166/multyfi-be
   npm i
   
2. Start the backend server

   sh
   npm start
   
<a id="usage"></a>

# Usage:
1. Upon accessing the application, the web client will display the last 10 lines of the log file.
2. As new log entries are appended to the file, they will automatically appear in the client interface without needing to refresh the page.
3. Multiple clients can access the application simultaneously, and all will receive real-time updates.

<a id="optimization"></a>

# Optimization:

To optimize for large log files:

- The server retrieves and streams only the updates to the clients, rather than transmitting the entire file each time.
- Initial loading of the last 10 lines is optimized for performance.

<a id="working-model-ss"></a>

# Working Model Screenshots

![image](https://github.com/garvit1166/multyfi-fe/assets/92694655/f0d0646d-b4ea-406b-b8ef-ead03e6f78a0)

![image](https://github.com/garvit1166/multyfi-fe/assets/92694655/a79155bf-9471-4525-a11e-405478e14f34)

# Working Model Vedio Demonstration

<video controls src="ScreenRec_2024-04-05 12-40-51.mp4" title="Vedio"></video>

<video controls src="ScreenRec_2024-04-05 12-46-00.mp4" title="Title"></video>