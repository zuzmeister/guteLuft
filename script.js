// Javascript den Pfad zu API übergeben. Entkommentiere jeweilige Zeile, wenn...

//var json_start = './json_start.php?'; // ..."guteluft" auf eigenem Webserver mit php läuft

var json_start = 'https://tommachtalles.net/guteluft/json_start.php?'; // ... die api auf tommachtalles.net verwendet werden soll

var startpunkt = [47.783306, 13.270917]; // "Mitte" Österreichs
var startzoom = 8;
jQuery(document).ready(function($) {
    
    map = new GMaps({
        el: '#map',
        lat: startpunkt[0],
        lng: startpunkt[1],
        zoom: startzoom,
    });
    ////// Versuchen, die genaue geolocation herauszufinden...
    GMaps.geolocate({
        success: function(position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
            map.setZoom(15);
        },
        error: function(error) {
            // alert('Geolocation failed: '+error.message);
        },
        not_supported: function() {
            // alert("Your browser does not support geolocation");
        },
        always: function() {
            // alert("Done!");
        }
    });

    ///// Konfiguration, wie die Karte eingefaerbt werden soll...
    var styles = [{
        stylers: [{
            hue: "#00ffe6"
        }, {
            saturation: -20
        }]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            lightness: 100
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            visibility: "on"
        }]
    }];

    map.addStyle({
        styledMapName: "Styled Map",
        styles: styles,
        mapTypeId: "map_style"
    });
    /*map.addMarker({
    lat: 48.1961455,
    lng: 16.2930688,
    title: 'Lima',
    // click: function(e) {
    //   alert('You clicked in this marker');
    // }
    infoWindow: {
    content: '<p>HTML Content</p>'
    }
    });*/
    $.getJSON(json_start, function(json) {
        var i = 1;
        while (json[i] != null) {
            map.addMarker({
                lat: json[i].lat,
                lng: json[i].lng,
                title: json[i].title,
                // click: function(e) {
                //   alert('You clicked in this marker');
                // }
                infoWindow: {
                    content: '<br> <a target="_blank" href="' +
                        json[i].url + '">' +
                        json[i].title +
                        '</a> ' +
                        '<hr> ' +
                        json[i].street + '&nbsp;' +
                        json[i].number + '<br>' +
                        json[i].zip + '<br>' +
                        json[i].city + '<br>' +
                        json[i].phone + '&nbsp;'
                }
            });
            i++;
        }
        $('#searchInput').attr('placeholder', $('#searchInput').attr('placeholder')+' ('+(i-1)+' Lokale verzeichnet)');
        $('.loadingpleasewait').css( 'display', 'none' );

    });
    map.setStyle("map_style");
    document.getElementById('map').focus();
    //// wenn in Suche "Enter" gedrückt wird, starte Suche....
    $('#searchInput').keypress(function(e) {
        if (e.which == 13) {
            $('#searchButton').click();
            return false;
        }
    });
    //// Starte Suche....
    $('#searchButton').click(
        function() {
            if ($('#searchInput').val() == '')
                return;

            ///// Zoome auf gesuchten Ort.
            GMaps.geocode({
                address: $('#searchInput').val(),
                callback: function(results, status) {
                    if (status == 'OK') {
                        var latlng = results[0].geometry.location;
                        map.fitBounds(results[0].geometry.viewport);
                        map.setCenter(latlng.lat(), latlng.lng());
                    }
                }
            });
        }
    );
});