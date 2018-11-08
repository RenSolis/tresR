var map;
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -8.127037,
            lng: -79.032386
        },
        zoom: 15
    });
    directionsDisplay.setMap(map);
    var icons = {
        electronics: {
            icon: '/Images/icons8-electronics-50.png'
        }
    };
    var features = [
        {
            position: new google.maps.LatLng(-8.127291, -79.025868),
            type: 'electronics',
            title: 'John F. Kennedy 461, Trujillo 13008, Peru'
        },
        {
            position: new google.maps.LatLng(-8.131891, -79.034068),
            type: 'electronics',
            title: 'D LOTE 41, prol cesar vallejo - urb jardines del golf MZ 14 LT 12, Trujillo, Peru'
        },
        {
            position: new google.maps.LatLng(-8.134151, -79.036058),
            type: 'electronics',
            title: 'Prol Cesar Vallejo mz 12 lt 7, Victor Larco Herrera 13009, Peru'
        },
        {
            position: new google.maps.LatLng(-8.124291, -79.039068),
            type: 'electronics',
            title: 'Av América Sur 4025, Trujillo 13008, Peru'
        },
        {
            position: new google.maps.LatLng(-8.106521, -79.041048),
            type: 'electronics',
            title: 'Av Antenor Orrego 110, Victor Larco Herrera, Peru'
        },
    ];
    features.forEach(function (feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            title: feature.title,
            animation: google.maps.Animation.DROP,
            map: map
        });

        var infowindow = new google.maps.InfoWindow({
            content: feature.title
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
            var positionx = marker.getPosition();
            calculateAndDisplayRoute(directionsService, directionsDisplay, positionx);
        });

    });

}
function calculateAndDisplayRoute(directionsService, directionsDisplay, positionx) {
    directionsService.route({
        origin: { lat: -8.126902, lng: -79.031621 },
        destination: positionx,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}