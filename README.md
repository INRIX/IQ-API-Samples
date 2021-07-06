# IQ API Samples Repository

### Overview

The repository features code samples demonstrating how to integrate with INRIX IQ APIs

### Create an API credentials

- Go to "INRIX Developer Console" (https://iq.inrix.com/developer/) and create your credentiasls (https://iq.inrix.com/developer/key-management)

### IQ API Explorer

- It allows you to browse the INRIX IQ APIs and explore the data direclty in your browser or developer tool (https://iq.inrix.com/developer/api-explorer)

## Set up your environment

```sh

git clone https://github.com/INRIX/iq-api-samples.git   
cd iq-api-samples/api 
npm install && npm start 

```

Use your appId and hashToken and set

```sh
config.appId = <your appId>
config.hashToken = <your hashToken>

```

Set correct appId and hashToken inside `express_backend/server-config.js` taken from "INRIX Developer Console"
- Start the node/express server with command some of the commands based on which sample you want to start.

### Tiles

The INRIX Tile Service returns images that contain traffic graphics. They are useful for any application where maps with traffic are displayed, such as mobile and web apps.
The INRIX Tile APIs provide convenient images to overlay on top of your own base map solution. Alternately, use the Traffic data APIs to receive just the data to build your own images. Using the Traffic APIs results in a smaller payload than tiles, but requires that you create the code to generate images, as well as data about the location and geometry of each TMC. In addition, tiles are two-dimensional, so they would not work if you plan to overlay road data on a 3D surface. The Tile Service returns images with a transparent background, so it can be superimposed over other maps, such as Google, Bing, Open Street Maps.

#### Tiles example with Open Street Map and Leaflet JS

To start the INRIX Tiles sample wtih Open Street Map and LeafLet JS you need to:

1. Ensure you went through the steps in `Set up your environment` section
2. Navigate to `express_backend` directory
3. Run command `npm run tiles_osm`

- In case you want to learn more about Open Street Map, you can visit --> https://www.openstreetmap.org/
- For getting more details on Leaflet JS --> https://leafletjs.com/

#### Tiles example with Google Maps

To check the INRIX Google maps Tiles sample, you need to:

1. Ensure you went through the steps in `Set up your environment` section
2. Navigate to `express_backend` directory
3. Run command `npm run tiles_gmaps`

#### Tiles example with Mapbox

To check the INRIX Mapbox Tiles sample, you need to:

1. Ensure you went through the steps in `Set up your environment` section
2. Navigate to `express_backend` directory
3. Run command `npm run tiles_mapbox`
### Drive Time Polygons

The INRIX Drive Time Polygons provides information on the time is takes to travel to or from a particular location based on typical traffic conditions.

The main usage scenarios for drive time polygons are:

- A potential home buyer can find houses where the typical commute time is less than a certain time to or from their office in the morning or evening. For example, I want to find properties within 15 minutes of my work location arriving at work at 8:00 am.

You can start exploring Drive Time Polygons Sample by:

1. Ensure you went through the steps in `Set up your environment` section
2. Navigate to `express_backend` directory
3. Run command `npm run dtp`
