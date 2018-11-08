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
        paper: {
            icon: '/Images/icons8-paper-50.png'
        }
    };
    var features = [
        {
            position: new google.maps.LatLng(-8.127291, -79.025868),
            type: 'paper',
            title: 'John F. Kennedy 461, Trujillo 13008, Peru'
        },
        {
            position: new google.maps.LatLng(-8.126891, -79.039068),
            type: 'paper',
            title: 'Sta Rosa 832, Victor Larco Herrera 13008, Perú'
        },
        {
            position: new google.maps.LatLng(-8.134151, -79.036058),
            type: 'paper',
            title: 'Prol Cesar Vallejo mz 12 lt 7, Victor Larco Herrera 13009, Peru'
        },
        {
            position: new google.maps.LatLng(-8.124291, -79.039068),
            type: 'paper',
            title: 'Av América Sur 4025, Trujillo 13008, Peru'
        },
        {
            position: new google.maps.LatLng(-8.128291, -79.040068),
            type: 'paper',
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