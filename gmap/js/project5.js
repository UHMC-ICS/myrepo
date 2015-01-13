function GIS() {

//--- Object attributes
var geocoder = null;
var gmMain = null;
var apikey = null;

var that = this;

this.init = function() {
    that.apikey = "?key=AIzaSyCckMCTYOqMly5Ye8HAa74ijG69vOzBz8Q";

    that.geocoder = new google.maps.Geocoder();

    // Bus route view
    that.gmMain = document.getElementById('gmMain');

    document.getElementById('layer1').addEventListener('click', that.showLayer, false);

    // Place view
    document.getElementById('layer2').addEventListener('click', that.showLayer, false);
    document.getElementById('btnPlace').addEventListener('click', that.showPlace, false);
    
    // Search view
    document.getElementById('layer3').addEventListener('click', that.showLayer, false);
    document.getElementById('btnSearch').addEventListener('click', that.showSearch, false);
    that.showRoute("Kahului", "Wailuku");
    
    // Handi-Van view
    document.getElementById('layer4').addEventListener('click', that.showLayer, false);
    document.getElementById('btnHandiVan').addEventListener('click', that.showHandiVan, false);

    document.getElementById('boxRoute').setAttribute("style","height: 87%");
    that.showRoute("Kahului", "Wailuku");
}

this.showLayer = function(e) {
    var layer1 = document.getElementById('layer1');
    var layer2 = document.getElementById('layer2');
    var layer3 = document.getElementById('layer3');
    var layer4 = document.getElementById('layer4');

    var boxRoute = document.getElementById('boxRoute');
    var boxPlace = document.getElementById('boxPlace');
    var boxSearch = document.getElementById('boxSearch');
    var boxHandiVan = document.getElementById('boxHandiVan');
    
    boxRoute.setAttribute("style","height: 0%");
    boxPlace.setAttribute("style","height: 0%");
    boxSearch.setAttribute("style","height: 0%");
    boxHandiVan.setAttribute("style","height: 0%");

    if (e.target === layer1) {
        boxRoute.setAttribute("style","height: 87%");
    } else if (e.target === layer2) {
        boxPlace.setAttribute("style","height: 87%");
    } else if (e.target === layer3) {
        boxSearch.setAttribute("style","height: 87%");
    } else if (e.target === layer4) {
        boxHandiVan.setAttribute("style","height: 87%");
    }
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

this.codeAddress = function(address) {
    that.geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var loc = results[0].geometry.location.toString();
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

} //--- end of custom GIS object
