// create map object
let eqMap = L.map("map", {
    center: [36, -97],
    zoom: 5
});

// add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(eqMap);


// link to json data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// function for colours - depth
// depth = feature.geometry.coordinates[2]

function pickColor(depth) {
    if (depth < 10) return "springgreen";
    else if (depth < 30) return "yellow";
    else if (depth < 50) return "orange";
    else if (depth < 70) return "coral";
    else if (depth < 90) return "tomato";
    else return "crimson"
};

// marker size - magnitude
// mag = feature.properties.mag

function setRadius(mag) {
    return Math.sqrt (mag) * 10
};


// retrieve data and plot
d3.json(link).then(function(data) {

    L.geoJSON(data, {
        //markers
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: setRadius(feature.properties.mag),
                color: 'black',
                opacity: 1,
                fillColor: pickColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.7,
                weight: 0.3
            });
        },

        // popups
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Location: ${feature.properties.place} <br>
                            Magnitude: ${feature.properties.mag} <br>
                            Depth: ${feature.geometry.coordinates[2]} km`)
        }
    }).addTo(eqMap);
})

// legend
let legend = L.control({position: "bottomright"});

// details
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90],
    colors = ["springgreen", "chartreuse", "gold", "orange", "coral", "tomato"];

    // header
    div.innerHTML += "Earthquake Depths (km) <br>"

    // add depths/colours
    for (let i = 0; i < depth.length; i++) {
        div.innerHTML += '<i style="background' + colors[i+1] + ';"></i>' + 
                        depth[i] + (depth[i+1] ? '&ndash;' + depth[i+1] + '<br>': '+');
    }
    return div;
};

legend.addTo(eqMap);



  