function GIS() {
        //--- GIS Properties
        this.gmMain = null;
        this.gmStreet = null;
        this.geocoder = new google.maps.Geocoder();

        this.apikey = "?key=AIzaSyCckMCTYOqMly5Ye8HAa74ijG69vOzBz8Q";

        this.rb1 = document.getElementById('rb1');
        this.rb2 = document.getElementById('rb2');
        this.rb3 = document.getElementById('rb3');
        this.rb4 = document.getElementById('rb4');

        this.panelRoute = document.getElementById('panelRoute');
        this.panelPlace = document.getElementById('panelPlace');
        this.panelSearch = document.getElementById('panelSearch');
        this.panelTransit = document.getElementById('panelTransit');

        this.panel = null;

        //--- GIS Methods
        this.init = function() {
            this.gmMain = document.getElementById('gmMain');
            this.gmStreet = document.getElementById('gmStreet');
            this.showPanel();
            this.showRoute("Kahului,Wailuku");
        };

        this.showPanel = function() {
            if (this.panel)
                this.panel.setAttribute("style", "display: none");

            if (this.rb1.checked) {
                this.panelRoute.setAttribute("style", "display: block");
                this.panel = this.panelRoute;
            }
            else if (this.rb2.checked) {
                this.panelPlace.setAttribute("style", "display: block");
                this.panel = this.panelPlace;
            }
            else if (this.rb3.checked) {
                this.panelSearch.setAttribute("style", "display: block");
                this.panel = this.panelSearch;
            }
            else if (this.rb4.checked) {
                this.panelTransit.setAttribute("style", "display: block");
                this.panel = this.panelTransit;
            }
        };

        this.showRoute = function(route) {
            var res = route.split(",");
            var url = "https://www.google.com/maps/embed/v1/directions";
            url += this.apikey;
            url += "&mode=transit";
            url += "&origin=" + res[0];
            url += "&destination=" + res[1];

            this.gmMain.setAttribute("src", url);
            this.geocodeAddress(res[1]);
        };

        this.showPlace = function() {
            var address = document.getElementById("idPlace").value;

            var url = "https://www.google.com/maps/embed/v1/place";
            url += this.apikey;
            url += "&q=" + address;
            this.gmMain.setAttribute("src", url);
            this.geocodeAddress(address);
        };

        this.showSearch = function() {
            var address = document.getElementById("idSearch").value;
            var url = "https://www.google.com/maps/embed/v1/search";
            url += this.apikey;
            url += "&q=" + address.replace(",", "+");

            if (document.getElementById("rbBus").checked) {
                url += "+bus+stop";
            }
            else if (document.getElementById("rbRest").checked) {
                url += "+restaurant";
            }
            else if (document.getElementById("rbHosp").checked) {
                url += "+hospital";
            } else {
                return;
            }
            this.gmMain.setAttribute("src", url);
            this.geocodeAddress(address);
        };

        this.showTransit = function() {
            var url = "transit.html";
            var pickup = document.getElementById("idPickup").value;
            pickup = pickup.replace(/,/g, " ");

            var dropoff = document.getElementById("idDropoff").value;
            dropoff = dropoff.replace(/,/g, " ");

            var route = pickup + "," + dropoff;
            this.gmMain.setAttribute("src", url);
            this.geocodeAddress(dropoff);
        };

        this.geocodeAddress = function(address) {
            var self = this;
            this.geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location.toString();
                    var url = "https://www.google.com/maps/embed/v1/streetview";
                    url += self.apikey;
                    url += "&heading=210";
                    url += "&pitch=10";
                    url += "&fov=35";
                    url += "&location=" + loc.substring(1, loc.length - 1);
                    self.gmStreet.setAttribute("src", url);
                }
                else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });
        };

    } //--- End of GIS Prototype