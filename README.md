# INRIX IQ API samples

## Overview

The repository features code samples demonstrating how to integrate with INRIX IQ APIs. The sample project uses `node express framework` with vanila `javascript` to showcase how to integrate different map providers e.g. OSM /Open Street Map/, Mapbox, Google and plot INRIX IQ APIs data on top. To run the app, you need to register with INRIX IQ Developer Console and get your API credentials.

## Get an API credentials

Go to "INRIX Developer Console" [here](https://iq.inrix.com/developer/) and create your credentials from the [key-management](https://iq.inrix.com/developer/key-management) section.  
Pull up the `appId && hashToken` for later use

![image](https://user-images.githubusercontent.com/1092422/124621192-be044e00-de82-11eb-9c69-25def6e7fc17.png)

## Review the available trial INRIX IQ APIs

While you are in the **INRIX Developer Console** you can review all available tiral APIs which can be explored with provisioned credentials.  
Note that you can explore them directly in your borowser via the **API Explorer** bilt-in feature inside the **IQ Developer Console**

![image](https://user-images.githubusercontent.com/1092422/124624795-e3df2200-de85-11eb-8ff6-f6a7b7adc28e.png)

## Set up your environment

Clone the repo

```
git clone https://github.com/INRIX/iq-api-samples.git

```

Use your appId and hashToken to conigure the `api` layer

```sh
config.appId = <your appId>
config.hashToken = <your hashToken>

```

Run the app

```sh
cd iq-api-samples/api
npm install && npm start

```

Open the app URL: http://localhost:3000 in your browser

![image](https://user-images.githubusercontent.com/1092422/124622097-7cc06e00-de83-11eb-9092-686b74253e3d.png)

## INRIX Samples

### INRIX Tiles

The INRIX Tile Service returns images that contain traffic graphics.
They are useful for any application where maps with traffic are displayed, such as mobile and web apps.
The INRIX Tile APIs provide convenient images to overlay on top of your own base map solution

#### Tiles on Open Street Map

The current sample shows how to consume Tile API and visualize its data on OSM (Open Street Map) via Leaflet.js library.

#### Tiles on Mapbox Map

This sample shows how to consume Tile API and visualize its data on Mapbox via Leaflet.js library.

### Tiles on Google Map

The sample shows how to consume Tile API and visualize its data on Google Map via Leaflet.js library.

### Drive Time Polygons on Open Street Map

The INRIX Drive Time Polygons provides information on the time is takes to travel to or from a particular location based on
typical traffic conditions. The main usage scenarios for drive time polygons are a potential home buyer can find houses where the
typical commute time is less than a certain time to or from their office in the morning or evening.
For example, I want to find properties within 15 minutes of my work location arriving at work at 8:00 am.

#### Scenario

The current sample shows how to consume Drive Time Polygons API and visualize its data on OSM via Leaflet.js library.

### Parking Lots on Open Street Map

The INRIX Parking Service is part of the company’s Connected Driver Services suite, whose aim is to give users relevant information
to help them save time, reduce frustration, and give them the critical insights to make better decisions while on the road.
The parking API for on-street parking. The parking API for off-street parking, showing parking lots and parking structures.
The v3 lots queries are based on a circle defined by a point (lat, lon) and a radius (meters).

#### Scenario

The sample shows how to consume Off-street parking API (lots) and visualize its data on OSM via Leaflet.js library.

### Parking Blocks on Google Map

The INRIX Parking Service is part of the company’s Connected Driver Services suite, whose aim is to give users relevant information to
help them save time, reduce frustration, and give them the critical insights to make better decisions while on the road.
The parking API for on-street parking. The “blocks” api returns data for a number of city blocks around a position.
A block represents a road from one intersection to the next.

#### Scenario

This sample shows how to consume blocks API and visualize its data on Google Map.

### Incidents on Google Map

INRIX Safety Alerts return information about many different type of incidents that happen on roadways that can impact people and
businesses in different ways. INRIX classifies the incident types for better filtering,identifies where it is, when it is, and
details such as the severity of the impact.

#### Scenario

The current sample shows incidents. When an incident is selected, details about it are dislayed.
