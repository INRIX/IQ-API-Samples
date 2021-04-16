/**
 * @module GeoLocationManager
 */

    /**
     * Represents a wrapper for 'navigator.geolocation.getCurrentPosition'.
     * @param options Initialization arguments.
     * @constructor
     */
    var GeoLocationManager = function(options) {
        options = options || {};
        var self = this;

        self.updateIntervalInMillis = options.updateIntervalInMillis || 1000;
        self.locationChangeListeners = [];
        self.speedThresholds = [];
        self.lastLocation = null;
        self.mockRequestLocation = options.mockRequestLocation;
        self.updatingLocation;
        self.updateLocationInterval;

        self.getCurrentPositionOptions = {
            enableHighAccuracy: true,
            maximumAge: 2000,
            timeout: 5000
        };

        /**
         * Returns the last known location, if any, or null.
         * @return {*} An instance, if set, of an object that contains last known location information.
         */
        self.getLastLocation = function() {
            return self.lastLocation;
        };

        /**
         * Called when current location update returns successfully.
         * @param position
         */
        self.geoLocationSuccessCallback = function(position) {
//            console.log("Current location: " + JSON.stringify(position));

            if (self.updatingLocation) {
                // Call the callback delegates.
                _.each(self.locationChangeListeners, function(listener) {
                    listener.onLocationUpdated(position);
                });

                // Call the threshold monitors.
                self.checkSpeedThresholds(position);
            }

            self.lastLocation = position;
        };

        /**
         * Called when current location update has failed.
         * @param error An error object.
         */
        self.geoLocationErrorCallback = function(error) {
            _.each(self.locationChangeListeners, function(listener) {
                listener.onLocationUpdateFailed(error);
            });
        };

        /**
         * Registers a listener that will be called when location update is occurred.
         * @param listener Callback function to call.
         */
        self.addLocationChangeListener = function(listener) {
            if(listener === null || listener === undefined) {
                return;
            }
            self.locationChangeListeners.push(listener);
        };

        /**
         * Un-registers a delegate so it will no longer will be called on location update.
         * @param target A delegate instance to unregister.
         */
        self.removeLocationChangeListener = function (target) {
            self.locationChangeListeners = _(self.locationChangeListeners).reject(function(listener) { return listener == target; });
        };

        /**
         * Registers a new speed threshold listener. Every listener must have a 'belowThresholdCallback(position)'
         * and 'aboveThresholdCallback(position)' methods defined.
         * @param listener An instance of speed threshold listener.
         */
        self.addSpeedThresholdObject = function(listener) {
            self.speedThresholds.push(listener);
        };

        /**
         * Un-registers a speed threshold listener.
         * @param target An instance of the speed threshold listener.
         */
        self.removeSpeedThresholdObject = function(target) {
            self.speedThresholds = _(self.speedThresholds).reject(function(listener) { return listener == target; });
        };

        /**
         * Check speed threshold and notify listeners about changes.
         * @param position Current location.
         */
        self.checkSpeedThresholds = function(position) {
            _.each(self.speedThresholds, function(thresholdObject) {
                if (self.lastLocation) {
                    if (position.coords.speed < thresholdObject.thresholdSpeed && self.lastLocation.coords.speed >= thresholdObject.thresholdSpeed) {
                        thresholdObject.belowThresholdCallback(position);
                    }
                    else if (position.coords.speed > thresholdObject.thresholdSpeed && self.lastLocation.coords.speed <= thresholdObject.thresholdSpeed) {
                        thresholdObject.aboveThresholdCallback(position);
                    }
                }
                else {
                    // We haven't gotten a reading before, so see if we are above or below the threshold.
                    if (position.coords.speed < thresholdObject.thresholdSpeed) {
                        thresholdObject.belowThresholdCallback(position);
                    }
                    else {
                        thresholdObject.aboveThresholdCallback(position);
                    }
                }
            });
        };

        /**
         * Starts updating the position, calling any registered callbacks.
         */
        self.startUpdatingLocation = function() {
            if (!self.updatingLocation) {
                self.updatingLocation = true;
                self.updateLocationInterval = setInterval(self.requestLocation, self.updateIntervalInMillis);
            }

            console.log('Started location refresh timer.');
        };

        /**
         * Turns off the checking position.
         */
        self.stopUpdatingLocation = function() {
            if (self.updatingLocation) {
                self.updatingLocation = false;
                clearInterval(self.updateLocationInterval);
            }
        };

        // this is the function which sits on the timer and updates the location
        // for testing, we use the mock object passed in with the options
        self.requestLocation = function() {
            if (self.mockRequestLocation) {
                self.mockRequestLocation(self.geoLocationSuccessCallback, self.geoLocationErrorCallback);
            }
            else {
                navigator.geolocation.getCurrentPosition(self.geoLocationSuccessCallback, self.geoLocationErrorCallback, self.getCurrentPositionOptions);
            }
        };
    };

    /**
     * Calculates the difference between two set sof lat/longs using the great circle
     *
     * @param point1
     *      String
     *          'lat|long'
     * @param point2
     *     String
     *         'lat|long'
     */
    GeoLocationManager.distanceInMetersBetweenTwoPoints = function(point1, point2) {
        var lat1 = point1.split('|')[0];
        var long1 = point1.split('|')[1];

        var lat2 = point2.split('|')[0];
        var long2 = point2.split('|')[1];


        var R = 6371000; // meters -- radius of the earth
        var DEG_TO_RADIANS = 0.0174532925;
        var dLat = (lat2 - lat1) *  DEG_TO_RADIANS;
        var dLong = (long2 - long1) * DEG_TO_RADIANS;
        lat1 = lat1 * DEG_TO_RADIANS;
        lat2 = lat2 * DEG_TO_RADIANS;

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLong/2) * Math.sin(dLong/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    };