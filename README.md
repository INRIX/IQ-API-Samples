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

### Tiles on Open Street Map

### Tiles on Mapbox Map

### Tiles on Google Map

### Drive Time Polygons on Open Street Map

### Parking Lots on Open Street Map

### Parking Blocks on Google Map

### Incidents on Google Map
