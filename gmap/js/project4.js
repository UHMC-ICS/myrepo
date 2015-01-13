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

    document.getElementById('boxRoute').setAttribute("style","height: 87%");
    that.showRoute("Kahului", "Wailuku");
}

this.showLayer = function(e) {
    var boxRoute = document.getElementById('boxRoute');

    boxRoute.setAttribute("style","height: 0%");
    boxRoute.setAttribute("style","height: 87%");
}

this.showRoute = function(fromAddress, toAddress) {
    var url = "https://www.google.com/maps/embed/v1/directions";
    var mode = "&mode=transit";
    var origin = "&origin=" + fromAddress;
    var dest = "&destination=" + toAddress;
    
    that.gmMain.setAttribute("src",url+that.apikey+mode+origin+dest);
    that.codeAddress(toAddress)
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
