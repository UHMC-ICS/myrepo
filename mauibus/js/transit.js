function MyAJAX() {
        //--- GIS Properties
        this.url = null;
        this.response = null;

        this.init = function(service) {
            this.url = service;
            this.response = document.getElementById('response');
            var route = document.getElementById('dataSrc').value;
            this.requestJSON(route);
        };

        this.requestJSON = function(jsonfile) {
            if (jsonfile === "") return;

            // send the asynchronous request
            var asyncRequest = new XMLHttpRequest();
            var self = this;

            asyncRequest.addEventListener("readystatechange",
                function() {
                    self.parseJSON(asyncRequest);
                }, false);

            jsonfile = this.url + jsonfile;

            asyncRequest.open("GET", jsonfile, true);
            asyncRequest.setRequestHeader("Accept", "application/json");
            asyncRequest.send(); // send request        
        };

        this.parseJSON = function(asyncRequest) {
            if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {
                var json = JSON.parse(asyncRequest.responseText);
                var ostr = "<table>"; // begin the table
                ostr += "<thead><tr><th colspan='16'>" + json.route + "</th></tr></thead>"; // year column heading
                ostr += "<tbody>";

                for (var loc = 0; loc < json.stop.length; ++loc) {
                    if (loc % 2 !== 0) {
                        ostr += "<tr class='oddrow'>";
                    }
                    else {
                        ostr += "<tr>";
                    }
                    ostr += "<td>" + json.stop[loc].location + "</td>"; // amount column heading

                    // output a table row for each year
                    for (var idx = 0; idx < json.stop[loc].time.length; ++idx) {
                        ostr += "<td>" + json.stop[loc].time[idx] + "</td>";
                    } //end for
                    ostr += "</tr>";
                }

                ostr += "</tbody></table>";
                this.response.innerHTML = ostr;
            }
        };

        this.requestDB = function(dbquery) {
            if (dbquery === "") return;

            // send the asynchronous request
            var asyncRequest = new XMLHttpRequest();
            var self = this;

            asyncRequest.addEventListener("readystatechange",
                function() {
                    self.parseDB(asyncRequest);
                }, false);

            dbquery = this.url + dbquery;

            asyncRequest.open("GET", dbquery, true);
            asyncRequest.setRequestHeader("Accept", "application/json");
            asyncRequest.send(); // send request        
        };

        this.parseDB = function(asyncRequest) {
            if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {
                var json = JSON.parse(asyncRequest.responseText);
                var ostr = "<table>"; // begin the table
                ostr += "<thead>";
                ostr += "<tr><th colspan='9'>UHMC Courses Fall 2015</th></tr>";
                ostr += "<tr><th>CRN</th><th>Name</th><th>Title</th><th>Credits</th><th>Instructor</th><th>Days</th><th>Time</th><th>Room</th><th>Dates</th></tr>";
                ostr += "</thead>";
                ostr += "<tbody>";

                for (var idx = 0; idx < json.length; ++idx) {
                    if (idx % 2 !== 0) {
                        ostr += "<tr class='oddrow'>";
                    }
                    else {
                        ostr += "<tr>";
                    }
                    ostr += "<td><a href=" + json[idx].href + ">" + json[idx].crn + "</a></td>";
                    ostr += "<td>" + json[idx].name + "</td>";
                    ostr += "<td>" + json[idx].title + "</td>";
                    ostr += "<td>" + json[idx].credits + "</td>";
                    ostr += "<td>" + json[idx].instructor + "</td>";
                    ostr += "<td>" + json[idx].days + "</td>";
                    ostr += "<td>" + json[idx].time + "</td>";
                    ostr += "<td>" + json[idx].room + "</td>";
                    ostr += "<td>" + json[idx].dates + "</td>";
                    ostr += "</tr>";
                }

                ostr += "</tbody></table>";
                this.response.innerHTML = ostr;
            }
        };

        this.requestDB2 = function(dbquery) {
            if (dbquery === "") return;

            // send the asynchronous request
            var asyncRequest = new XMLHttpRequest();
            var self = this;

            asyncRequest.addEventListener("readystatechange",
                function() {
                    self.parseDB2(asyncRequest);
                }, false);

            dbquery = this.url + dbquery;

            asyncRequest.open("GET", dbquery, true);
            asyncRequest.setRequestHeader("Accept", "application/json");
            asyncRequest.send(); // send request        
        };

        this.parseDB2 = function(asyncRequest) {
            if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {
                var json = JSON.parse(asyncRequest.responseText);
                var ostr = "<table>"; // begin the table
                ostr += "<thead>";
                ostr += "<tr><th colspan='9'>UHMC Courses Fall 2015</th></tr>";
                ostr += "<tr><th>CRN</th><th>Name</th><th>Title</th><th>Credits</th><th>Instructor</th><th>Days</th><th>Time</th><th>Room</th><th>Dates</th></tr>";
                ostr += "</thead>";
                ostr += "<tbody>";

                for (var idx = 0; idx < json.length; ++idx) {
                    if (idx % 2 !== 0) {
                        ostr += "<tr class='oddrow'>";
                    }
                    else {
                        ostr += "<tr>";
                    }
                    ostr += "<td><a href=" + json[idx].href + ">" + json[idx].crn + "</a></td>";
                    ostr += "<td>" + json[idx].name + "</td>";
                    ostr += "<td>" + json[idx].title + "</td>";
                    ostr += "<td>" + json[idx].credits + "</td>";
                    ostr += "<td>" + json[idx].instructor + "</td>";
                    ostr += "<td>" + json[idx].days + "</td>";
                    ostr += "<td>" + json[idx].time + "</td>";
                    ostr += "<td>" + json[idx].room + "</td>";
                    ostr += "<td>" + json[idx].dates + "</td>";
                    ostr += "</tr>";
                }

                ostr += "</tbody></table>";
                this.response.innerHTML = ostr;
            }
        };

        this.requestPDF = function(pdfname) {
            if (pdfname === "") return;
            pdfname = this.url + pdfname;
            this.response.innerHTML = "<iframe width=100% height=1000px src=" + pdfname + "></iframe>";
        };
    } //end-of-prototype
