# IQ API Samples Repository

## Overview

The repository features code samples demonstrating how to integrate with INRIX IQ APIs. The sample project uses ``` node express ``` with vanila javascript to showcase how to integrate different map providers e.g. Open Street Map, Mapbox and Google and plot INRIX IQ APIs data on top. To run the app, you need to register with INRIX IQ Developer Console and get your API credentials.

## Get an API credentials

Go to "INRIX Developer Console" [here](https://iq.inrix.com/developer/) and create your credentiasls from the [key-management](https://iq.inrix.com/developer/key-management) section
Pull up the ``` appId && hashToken ``` for later use

img here

## Review the available trial INRIX IQ APIs

While you are in the **INRIX Developer Console** you can review all available tiral APIs which can be explored with provisioned credentials 

img here

## Set up your environment


Clone the repo

```
git clone https://github.com/INRIX/iq-api-samples.git   

```

Use your appId and hashToken to conigure the ``` api ``` layer

```sh
config.appId = <your appId>
config.hashToken = <your hashToken>

```
Run the app

```sh
cd iq-api-samples/api 
npm install && npm start 

```

img from the running app