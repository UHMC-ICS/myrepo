function GIS() {

//--- Object attributes
var geocoder = null;
var gmMain = null;
var gmStreet = null;
var apikey = null;

var that = this;

this.init = function() {
    that.apikey = "?key=AIzaSyCckMCTYOqMly5Ye8HAa74ijG69vOzBz8Q";

    that.geocoder = new google.maps.Geocoder();

    // Bus route view
    that.gmMain = document.getElementById('gmMain');
    that.gmStreet = document.getElementById('gmStreet');

    document.getElementById('layer1').addEventListener('click', that.showLayer1, false);

    // Place view
    document.getElementById('layer2').addEventListener('click', that.showLayer2, false);
    document.getElementById('btnPlace').addEventListener('click', that.showPlace, false);
    
    // Search view
    document.getElementById('layer3').addEventListener('click', that.showLayer3, false);
    document.getElementById('btnSearch').addEventListener('click', that.showSearch, false);
    that.showLayer1();
    that.showRoute("Kahului", "Wailuku");
    
    // Handi-Van view
    document.getElementById('layer4').addEventListener('click', that.showLayer4, false);
    document.getElementById('btnHandiVan').addEventListener('click', that.showHandiVan, false);
    that.showLayer1();
    that.showRoute("Kahului", "Wailuku");
}

this.showLayer1 = function() {
    var boxRoute = document.getElementById('boxRoute');
    var boxPlace = document.getElementById('boxPlace');
    var boxSearch = document.getElementById('boxSearch');
    var boxHandiVan = document.getElementById('boxHandiVan');
    
    boxRoute.setAttribute("style","height: 87%");
    boxPlace.setAttribute("style","height: 0%");
    boxSearch.setAttribute("style","height: 0%");
    boxHandiVan.setAttribute("style","height: 0%");
}

this.showLayer2 = function() {
    var boxRoute = document.getElementById('boxRoute');
    var boxPlace = document.getElementById('boxPlace');
    var boxSearch = document.getElementById('boxSearch');
    var boxHandiVan = document.getElementById('boxHandiVan');
    
    boxRoute.setAttribute("style","height: 0%");
    boxPlace.setAttribute("style","height: 87%");
    boxSearch.setAttribute("style","height: 0%");
    boxHandiVan.setAttribute("style","height: 0%");
}

this.showLayer3 = function() {
    var boxRoute = document.getElementById('boxRoute');
    var boxPlace = document.getElementById('boxPlace');
    var boxSearch = document.getElementById('boxSearch');
    var boxHandiVan = document.getElementById('boxHandiVan');
    
    boxRoute.setAttribute("style","height: 0%");
    boxPlace.setAttribute("style","height: 0%");
    boxSearch.setAttribute("style","height: 87%");
    boxHandiVan.setAttribute("style","height: 0%");
}

this.showLayer4 = function() {
    var boxRoute = document.getElementById('boxRoute');
    var boxPlace = document.getElementById('boxPlace');
    var boxSearch = document.getElementById('boxSearch');
    var boxHandiVan = document.getElementById('boxHandiVan');
    
    boxRoute.setAttribute("style","height: 0%");
    boxPlace.setAttribute("style","height: 0%");
    boxSearch.setAttribute("style","height: 0%");
    boxHandiVan.setAttribute("style","height: 87%");
}

this.showRoute = function(fromAddress, toAddress) {
    var url = "https://www.google.com/maps/embed/v1/directions";
    var mode = "&mode=transit";
    var origin = "&origin=" + fromAddress;
    var dest = "&destination=" + toAddress;
    
    that.gmMain.setAttribute("src",url+that.apikey+mode+origin+dest);
    that.codeAddress(toAddress)
}

this.showPlace = function() {
    var address = document.getElementById("idPlace").value;
    
    var url = "https://www.google.com/maps/embed/v1/place";
    var qry = "&q=" + address;
    var flag = document.getElementById("layer2").checked;
    
    if (flag) {
        that.gmMain.setAttribute("src",url+that.apikey+qry);
        that.codeAddress(address)
    }
}

this.showSearch = function() {
    var query = document.getElementById("idSearch").value;
    
    var url = "https://www.google.com/maps/embed/v1/search";
    var qry = "&q=" + query.replace(",","+");
    var flag = document.getElementById("layer3").checked;
    
    if (flag) {
        if (document.getElementById("cbxBus").checked) {
            qry += "+bus+stop";
        } else if (document.getElementById("cbxRest").checked) {
            qry += "+restaurant";
        } else {
            qry += "+hospital";
        }
        that.gmMain.setAttribute("src",url+that.apikey+qry);
    }
}

this.showHandiVan = function() {
    var fromAddress = document.getElementById("idPickup").value;
    var toAddress = document.getElementById("idDropoff").value;
    that.showRoute(fromAddress, toAddress);
}

this.showStreet = function(address) {
    var url = "https://www.google.com/maps/embed/v1/streetview";
    var heading = "&heading=210";
    var pitch = "&pitch=10";
    var fov = "&fov=35";
    var loc = "&location=" + address;
    that.gmStreet.setAttribute("src",url+that.apikey+loc+heading+pitch+fov);
}

this.codeAddress = function(address) {
    that.geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var loc = results[0].geometry.location.toString();
            that.showStreet(loc.substring(1,loc.length-1));
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

} //--- end of custom GIS object
