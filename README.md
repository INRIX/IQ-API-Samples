# IQ API Samples Repository

### Overview

The repository features code samples demonstrating how to integrate with INRIX IQ APIs

### Create an API credentials

- Go to "INRIX Developer Console" (https://iq.inrix.com/developer/) and create your credentiasls (https://iq.inrix.com/developer/key-management)

### IQ API Explorer

- It allows you to browse the INRIX IQ APIs and explore the data direclty in your browser or developer tool (https://iq.inrix.com/developer/api-explorer)

## Code Samples / Manual Scenarios Installation

- Clone the repository
- Install the project dependencies with: npm install inside the `express_backend` directory
- Set correct appId and hashToken inside `express_backend/server-config.js` taken from "INRIX Developer Console"
- Start the node/express server with command: `npm run dev`

### Authentication

- How to create an INRIX IQ API Credentials --> https://iq.inrix.com/developer/key-management
- How to exchange an app `appId` & `hashToken` for an `access_token` --> https://iq.inrix.com/developer/api-explorer

### Speed

- ### Tiles
  - Using Traffic Tiles API with OpenStreatMap /OSM/
