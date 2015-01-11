function clickETF(etf){
//    alert(etf);
    document.getElementById("etfname").innerHTML="Select an ETF... <em>" + etf + "</em>";
    var myhref = "research2.fidelity.com/fidelity/screeners/etf/etfholdings.asp?symbol=" + etf + "&view=Explore";
    document.getElementById("iframe_a").src=myhref;
//    location.reload();
}

function clickTicker(assets){
//    alert(assets);
    var asset_names = document.getElementById(assets).value;
    alert(asset_names);
// Create button for each asset name.
}

function scrapePage(){
    var savetitle = document.getElementById("etfname").innerHTML;
//    var idoc = document.getElementById("iframe_a").document;
    var element = document.getElementById("WSOD");
    var table = element.getElementByTagName("table");
    alert(table);
    document.getElementById("etfname").innerHTML=savetitle;
}
