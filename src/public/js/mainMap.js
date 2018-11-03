var map, infoWindow;
var poss =null;
function initMap() {
    var auxx=0;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -8.126902, lng: -79.031621},
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;
    var icons = {
        bus_far: {
           icon: 'Images/bus.png'
        },
        bus_near:
        {
            icon: 'Images/bus2.png'
        }
    };
    var features = [
        {
            position: new google.maps.LatLng(-8.126591, -79.032068)
        },
        {
            position: new google.maps.LatLng(-8.126891, -79.039068)
        }
    ];
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Esta es tu ubicación.');
        infoWindow.open(map);
        map.setCenter(pos);
        poss = new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            animation: google.maps.Animation.DROP,
            map: map
        });
        features.forEach(function(feature) {
            if(google.maps.geometry.spherical.computeDistanceBetween(map.getCenter(),feature.position)<500) {
                var marker = new google.maps.Marker({
                position: feature.position,
                icon: icons['bus_near'].icon,
                animation: google.maps.Animation.DROP,
                map: map
            });
            var infow = new google.maps.InfoWindow({
                content: google.maps.geometry.spherical.computeDistanceBetween(map.getCenter(),feature.position)+' mts',
            });
            marker.addListener('click', function() {
                infow.open(map, marker);
            });
            } else {
                var marker = new google.maps.Marker({
                    position: feature.position,
                    icon: icons['bus_far'].icon,
                    animation: google.maps.Animation.DROP,
                    map: map
                });
                var infow = new google.maps.InfoWindow({
                    content: google.maps.geometry.spherical.computeDistanceBetween(map.getCenter(),feature.position)+' mts',
                });
                marker.addListener('click', function() {
                    infow.open(map, marker);
                });
            }
        });
    },
    function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
    auxx=1;
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
    if(auxx=0) {
        features.forEach(function(feature) {
            var marker = new google.maps.Marker({
                position: feature.position,
                icon: icons['bus_far'].icon,
                animation: google.maps.Animation.DROP,
                map: map
            });
        });
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}