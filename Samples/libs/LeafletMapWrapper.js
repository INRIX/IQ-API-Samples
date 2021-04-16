(function()
{
    this.LeafletMapWrapper = function(container, geoLocator){
        var self = this;
        self.container = container;
        self.geoLocator = geoLocator;
        self.markersLayer = new L.LayerGroup();
        self.locationMarkerIconOptions = {
            iconUrl:'images/my_location.png',
                width: 30,
                height: 30
        };

        self.locationUpdateListener = {
            onLocationUpdated: function(position) {
                self.updateLocationMarker(position);
            },
            onLocationUpdateFailed: function() {
                self.updateLocationMarker(GeoLocator.getLastLocation());
            }
        };

        self.animateMarker = function(marker, location, duration) {
            var startLocation = marker.getLatLng();
            var endLocation = location;
            var startTime = new Date();
            var speed = duration;

            if (speed === undefined) {
                // Default to 1 second.
                speed = 1000;
            }

            if (self.locationMarkerAnimationTimeout !== null) {
                window.clearTimeout(this.locationMarkerAnimationTimeout);
                self.locationMarkerAnimationTimeout = null;
            }

            self.locationMarkerAnimationTimeout = window.setInterval(function() {
                var timeElapsed = (new Date()) - startTime;
                if (timeElapsed >= speed) {
                    // Full animation time (speed) has elapsed
                    // Just set final location and end animation
                    marker.setLatLng(endLocation);
                    window.clearInterval(self.locationMarkerAnimationTimeout);
                    self.locationMarkerAnimationTimeout = null;
                }

                // Set the Latitude/Longitude values to a percentage
                // of the total distance to move based on the amount
                // of time that has elapsed since animation started.
                var timeElapsedPercent = (timeElapsed / speed);
                var latitudeDistToMove = (endLocation.lat - startLocation.lat);
                var longitudeDistToMove = (endLocation.lng - startLocation.lng);

                var latitudeOffset = startLocation.lat + (timeElapsedPercent * latitudeDistToMove);
                var longitudeOffset = startLocation.lng + (timeElapsedPercent * longitudeDistToMove);
                var locationOffset = L.latLng(latitudeOffset, longitudeOffset);
                marker.setLatLng(locationOffset);
            }, 5);
        };

        /**
         * Adds marker to the map.
         *
         * @method addMarker
         * @param {Number} latitude Marker id which you need to remove.
         * @param {Number} longitude Marker id which you need to remove.
         * @param {Object} icon
         * @param {Integer} [icon.width]
         * @param {Integer} [icon.height]
         * @param {string} icon.iconUrl
         * @param {Object} [icon.offset]
         * @param {Integer} icon.offset.x
         * @param {Integer} icon.offset.y
         * @param {Function} onClickHandler
         * @param {string} options See http://leafletjs.com/reference.html#marker-options for details.
         */
        self.addMarker = function(latitude, longitude, icon, onClickHandler, options) {
            // Initialize icon.
            // TODO: Remove this hard-coded size.
            var iconWidth = icon.width || 25;
            var iconHeight = icon.height || 25;
            var iconOptions = {
                iconUrl: icon.iconUrl,
                iconSize: new L.Point(iconWidth, iconHeight),
                iconAnchor: (icon && icon.offset) ? new L.Point(icon.offset.x, icon.offset.y) : undefined
            };
            var markerIcon = L.Icon.extend({ options: iconOptions });

            // Create a marker.
            var latLng = new L.LatLng(latitude, longitude);
            var markerOptions = {
                icon: new markerIcon(),
                clickable: icon.clickable === undefined ? true : icon.clickable
            };
            L.extend(markerOptions, options);
            var marker = icon.iconUrl === null || icon.iconUrl === '' ? new L.Marker(latLng) : new L.Marker(latLng, markerOptions);

            if (onClickHandler) {
                marker.on('click', onClickHandler);
            }

            this.markersLayer.addLayer(marker);
            return marker;
        };


        self.updateLocationMarker = function(location){
            if (location === null) {
                return;
            }

            var latitude = location.coords.latitude;
            var longitude = location.coords.longitude;
            if (self.previousLocation &&
                self.previousLocation.latitude == latitude &&
                self.previousLocation.longitude == longitude) {
                return;
            }

            if (self.locationMarker) {

                this.animateMarker(self.locationMarker, L.latLng(latitude, longitude), 1000);

            } else {
                // Create the new one.
                var addOptions = {
                    zIndexOffset: 300
                };
                this.locationMarker = self.addMarker(latitude, longitude, self.locationMarkerIconOptions, null, addOptions);
           }

            self.previousLocation = { latitude: latitude, longitude: longitude };
            self.panTo(latitude, longitude);

        };

        self.panTo = function(latitude, longitude){
            self.map.panTo(L.latLng(latitude, longitude));
        };

        self.render = function(){
            var bingMapUrl = 'http://ecn.t{s}.tiles.virtualearth.net/tiles/r{q}?g=914&mkt=en-us&lbl=l1&stl=h&shading=hill&n=z';
            var bingMapLayer = new L.TileLayer(bingMapUrl, { maxZoom: 19, attribution: false, unloadInvisibleTiles:false });

            var initialZoom = 13;
            var mapCenter = new L.LatLng(0, 0);

            self.map = new L.Map(container, {
                center:mapCenter,
                zoom:initialZoom,
                touchZoom:true,
                attributionControl:false
            });
            bingMapLayer.getTileUrl = function (tilePoint, zoom) {
                zoom || (zoom  = self.map.getZoom());

                var subdomains = '0123',
                    index = (tilePoint.x + tilePoint.y) % subdomains.length,
                    s = subdomains[index];

                return L.Util.template(this._url, L.Util.extend({
                    s: s,
                    q: Inrix.Util.tileXYToQuadKey(tilePoint.x, tilePoint.y, zoom)
                }, this.options));
            };

            self.map.setZoom(initialZoom)
                .addLayer(bingMapLayer)
                .addLayer(self.markersLayer);
            if (!self.geoLocator)
                return self;
            self.geoLocator.addLocationChangeListener(self.locationUpdateListener);
            var location = self.geoLocator.getLastLocation();
            if (location)
                self.updateLocationMarker(location);
            return self;
        };

        self.incidentIconUrls = {
            "construction": "images/constructionPin@2x.png",
            "police":       "images/policePin@2x.png",
            "accident":     "images/incidentPin@2x.png",
            "event":        "images/eventPin@2x.png",
            "congestion":   "images/congestionPin@2x.png",
            "default":      "images/incidentPin@2x.png"
        }

        var LeafletIncidentIcon = L.Icon.extend({
            options:{
                iconUrl: self.incidentIconUrls['default'],
                iconRetinaUrl: self.incidentIconUrls['default'],
                iconSize: new L.Point(32, 45),
                iconAnchor: new L.Point(16, 45),
                popupAnchor: new L.Point(0, -45)
            }
        });

        self.incidentIcons = [
            "",
            new LeafletIncidentIcon({iconUrl: self.incidentIconUrls['construction']}),
            new LeafletIncidentIcon({iconUrl: self.incidentIconUrls['event']}),
            new LeafletIncidentIcon({iconUrl: self.incidentIconUrls['congestion']}),
            new LeafletIncidentIcon({iconUrl: self.incidentIconUrls['accident']}),
            "",
            new LeafletIncidentIcon({iconUrl: self.incidentIconUrls['police']}),
            new LeafletIncidentIcon({iconUrl: self.incidentIconUrls['default']}), // TODO: add image for camera
            new LeafletIncidentIcon({iconUrl: self.incidentIconUrls['default']})  // TODO: add image for hazard
        ];

        self.showIncidents = function(incidents) {
            var incidentClick = function(event) {
                var latlon = event.target._latlng;
                var incident = event.target.options.incident;

                // Center map on the incident.
                self.map.panTo(latlon);

                // Create and show the popup.
                var popup = new L.Popup({
                    autoPan: false,
                    maxWidth: 250,
                    offset: new L.Point(0, -35)
                });
                console.log(latlon);
                popup.setLatLng(latlon);
                popup.setContent(incident.shortDesc + self.getIncidentReportTime(incident));
                var popOpen = function () {
                    popup.openOn(self.map);
                };
                popOpen();

            };

            self.markersLayer.clearLayers();
            $.each(incidents, function(index, incident) {
                try {
                    var incidentMarker = new L.Marker([incident.latitude, incident.longitude], {
                        icon:self.incidentIcons[incident.type],
                        opacity:incident.justReported ? 0.6 : 1.0,
                        incident:incident,
                        riseOnHover: true
                    });
                    incidentMarker.on('click', incidentClick);

                    self.markersLayer.addLayer(incidentMarker);
                } catch (e) {
                    console.log(e);
                }

            });
        };

        self.getIncidentReportTime = function(incident) {
            var reportTime = new Date().parseISO8601(incident.startTime);
            return '<span class="reportTime">' +
                '<i>. Reported@ ' + reportTime.format("mmm dd, yyyy HH:MM") + '</i></span>';
        };

        self.onMoveEnd = function(callback) {
            self.map.on('moveend', callback, self);
        }

        return self;
    };
}).call(this);