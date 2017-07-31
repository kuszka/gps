/**
 * Created by magda on 30.07.17.
 */
        var markers;
        var map;
        window.sendDemand = function(){
            var e = document.getElementById("problem");
            var strUser = e.options[e.selectedIndex].value;
            var rad = document.getElementById("radius").value;
            var lat = document.getElementById("latbox").textContent;
            var long = document.getElementById("lngbox").textContent;
            //console.log('hello');
            var urlServer = "http://0.0.0.0:8000/server/"+strUser;
             if (!rad.valueMissing) {
                if(rad>0){
                    urlServer += "/" + lat + "," + long + "/" + Math.ceil(rad);
                    //console.log(urlServer)
                    }
                }
            $.ajax({
            url: urlServer,
            dataType: 'json',
            success: function(data) {
                    console.log('parsing...');
                    if(!markers.empty){
                        for (var j = 0; j < markers.length; j++) {
                            markers[j].setMap(null);
                        }
                        markers = [];
                    }
                    for (var i=0;i<data.length;i++) {
                        var object = data[i];
                        var iconBase = "http://maps.google.com/mapfiles/";
                        var iconURL;
                        var infowindows =[];
                        for (var property in object) {
                            if(object.hasOwnProperty('latitude') && object.hasOwnProperty('longitude') && object.hasOwnProperty('description')){
                                var point = new google.maps.LatLng(object['latitude'],object['longitude']);
                                //var thisLocation = object['latitude'] + "," + object['longitude'];
                                var desc = object['description'].toString();
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
                                 var infowindow = new google.maps.InfoWindow({
                                    content: '<span>'+ object['description']+'</span>'
                                 });
                                //new google.maps.Marker({
                                var marker = new google.maps.Marker({
                                    position: point,
                                    title: desc,
                                    map: map,
                                    icon: iconURL
                                });
                                markers.push(marker);
                                infowindows.push(infowindow);
                            }
                        }
                        //for(var k=0;k<infowindows.length;k++){
                        //    google.maps.event.addListener(marker[k], 'click', function() {
                        //        infowindows[k].open(map,marker[k]);
                        //    });
                        //}
                    }
            },
             error: function() {
                document.write("error");
            }
            });
        };

       window.myMap = function(){
            markers = [];
            var point = new google.maps.LatLng(52.408492,16.933965);
            var mapProp= {
                center: point,
                zoom:13
                };
        map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
        var marker=new google.maps.Marker({
          position: point,
            draggable: true,
            title: "Position",
          map: map
        });
        var infowindow = new google.maps.InfoWindow({
            content: "<span>Twoja pozycja</span>"
        });
        google.maps.event.addListener(marker, 'dragend', function (event) {
            document.getElementById("latbox").innerHTML = this.getPosition().lat();
            document.getElementById("lngbox").innerHTML = this.getPosition().lng();
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
        };