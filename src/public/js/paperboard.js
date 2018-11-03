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
        caja: {
            icon: '/Images/ticket_office2.png'
        }
    };
    var features = [
        {
            position: new google.maps.LatLng(-8.126591, -79.032068),
            type: 'caja',
            title: 'UPAO Plaza CENTER, Urb. Monserate Mzna. V Lt 14, Av América Sur, Trujillo 13008, Perú'
        },
        {
            position: new google.maps.LatLng(-8.126891, -79.039068),
            type: 'caja',
            title: 'Sta Rosa 832, Victor Larco Herrera 13008, Perú'
        },
        {
            position: new google.maps.LatLng(-8.136191, -79.034058),
            type: 'caja',
            title: '13007 Urb. Mz D Lt, Av. Perú 3, Trujillo, Perú'
        },
        {
            position: new google.maps.LatLng(-8.128291, -79.040068),
            type: 'caja',
            title: 'Av. Fátima 261, Victor Larco Herrera 13008, Perú'
        },
        {
            position: new google.maps.LatLng(-8.106521, -79.041048),
            type: 'caja',
            title: 'Av Pedro Muñiz 1062, Trujillo, Perú'
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
