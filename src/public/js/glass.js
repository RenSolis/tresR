var map;
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -8.126902, lng: -79.031621 },
        zoom: 8
    });
    directionsDisplay.setMap(map);
    var icons = {
        fragile: {
            icon: '/Images/icons8-fragile-50.png'
        }
    };
    var features = [
        {
            position: new google.maps.LatLng(-8.106521, -79.041048),
            type: 'fragile',
            title: 'Av Pedro Muñiz 1062, Trujillo, Perú'
        },
        {
            position: new google.maps.LatLng(-8.127291, -79.025868),
            type: 'fragile',
            title: 'John F. Kennedy 461, Trujillo 13008, Peru'
        },
        {
            position: new google.maps.LatLng(-8.131891, -79.034068),
            type: 'fragile',
            title: 'D LOTE 41, prol cesar vallejo - urb jardines del golf MZ 14 LT 12, Trujillo, Peru'
        },
        {
            position: new google.maps.LatLng(-8.134151, -79.036058),
            type: 'fragile',
            title: 'Prol Cesar Vallejo mz 12 lt 7, Victor Larco Herrera 13009, Peru'
        },
        {
            position: new google.maps.LatLng(-8.128291, -79.040068),
            type: 'fragile',
            title: 'Av. Fátima 261, Victor Larco Herrera 13008, Perú'
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