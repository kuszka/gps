/**
 * Created by magda on 30.07.17.
 */
var markers; //table of markers
var map;
var myMarker; //user position

window.sendDemand = function(){
    var e = document.getElementById("problem");
    var strUser = e.options[e.selectedIndex].value;
    var rad = document.getElementById("radius").value;
    var lat = document.getElementById("latbox").textContent;
    var long = document.getElementById("lngbox").textContent;

    //merge URL - based on hostname, what makes it available on other devices in local network
    var id = location.hostname;
    var urlServer = "http://" + id + ":8000/server/" + strUser;
    if (!rad.valueMissing) {
        if(rad>0){
            urlServer += "/" + lat + "," + long + "/" + Math.ceil(rad);
        }
    }
    // get response from server and put markers on map
    $.ajax({
        url: urlServer,
        dataType: 'json',
        success: function(data) {
            console.log('parsing...');
            //delete all old markers
            if(!markers.empty){
                for (var j = 0; j < markers.length; j++) {
                    markers[j].setMap(null);
                }
                markers = [];
            }
            // for every object in json get properties and put it on map
            for (var i=0;i<data.length;i++) {
                var object = data[i];
                var iconBase = "http://maps.google.com/mapfiles/";
                var iconURL;
                for (var property in object) {
                    if(object.hasOwnProperty('latitude') && object.hasOwnProperty('longitude') && object.hasOwnProperty('description')){

                        var point = new google.maps.LatLng(object['latitude'],object['longitude']);
                        //different color for every event
                        switch (object['eventType']){
                            case 'accidents':
                                iconURL = iconBase + 'marker_orange.png';
                                break;
                            case 'roadworks':
                                iconURL = iconBase + 'marker_green.png';
                                break;
                            case 'trafficjams':
                                iconURL = iconBase + 'marker_purple.png';
                                break;
                            default:
                                iconURL = iconBase + 'marker_black.png';
                                break;
                        }

                        var infoWindow = new google.maps.InfoWindow;
                        var marker = new google.maps.Marker({
                            position: point,
                            map: map,
                            icon: iconURL
                        });
                        //make the on-click label
                        (function (marker, object) {
                            google.maps.event.addListener(marker, "click", function (e) {
                            infoWindow.setContent(object['description']);
                            infoWindow.open(map, marker);
                            });
                         })(marker, object);
                        markers.push(marker);
                    }
                }
            }
        },
        // if something fail with communication
        error: function() {
            document.write("error");
        }
    });
};

//initialization of map
window.myMap = function(){
    markers = [];
    var point = new google.maps.LatLng(52.408492,16.933965);
    var mapProp= {
        center: point,
        zoom:13
    };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    // your position marker (red one)
    myMarker=new google.maps.Marker({
        position: point,
        draggable: true,
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
        content: "<span>Twoja pozycja</span>"
    });
    google.maps.event.addListener(myMarker, 'dragend', function (event) {
        document.getElementById("latbox").innerHTML = this.getPosition().lat();
        document.getElementById("lngbox").innerHTML = this.getPosition().lng();
    });
    google.maps.event.addListener(myMarker, 'click', function() {
        infowindow.open(map,myMarker);
    });
};

window.geoFindMe = function () {
    var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolokacja nie jest wspierana przez twoją przeglądarkę</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("latbox").innerHTML = latitude;
    document.getElementById("lngbox").innerHTML = longitude;

    var googlePos = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));
    myMarker.setPosition(googlePos);
    }
  function error() {
    output.innerHTML = "Błąd podczas uzyskiwania lokalizacji";
  }
  navigator.geolocation.getCurrentPosition(success,error);
};