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


// function for colours
let depth = feature.geometry.coordinates[2]

function pickColor(depth) {
    if (depth < 10) return "yellow";
    else if (depth < 30) return "red";
    else if (depth < 50) return "green";
    else if (depth < 70) return "blue";
    else if (depth < 90) return "pink";
    else return "red";
}

// marker size
let mag = feature.properties.mag
function size(mag) {
    return Math.sqrt (mag) * 20;
}

d3.json(link).then(function(response) {
    
    features = response.features;
    let limit = features.length;

    for (let i = 0; i < limit; i++) {
        let location = features[i].geo;
        if (location) {
            L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                color: "black",
                fillColor: pickColor(depth),
                radius: size(mag),
                fillOpacity: 0.7,
            }).bindPopup ("<h3> Place : + feature.properties.place")
            .addTo(eqMap);
        }
    }
});
