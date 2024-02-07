function loadPlaces(position) {
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        version: '20240207',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API (limit param: number of maximum places to fetch)
    const endpoint = `${corsProxy}https://api.foursquare.com/v3/places/nearby?ll=${position.latitude},${position.longitude}&radius=${params.radius}&limit=5&v=${params.version}`;

    // Adding the Authorization header with the API key
    const headers = {
        'Authorization': 'fsq3VQCPORknYumFLDe2GqGKtzLOimx2j+ItqtgjPCscnS4='
    };

    return fetch(endpoint, { headers })
        .then((res) => res.json())
        .then((resp) => {
            return resp.results; // Adjusted to match the expected response format for the new API version
        })
        .catch((err) => {
            console.error('Error with places API', err);
        });
};



window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    const placeText = document.createElement('a-link');
                    placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    placeText.setAttribute('title', place.name);
                    placeText.setAttribute('scale', '15 15 15');
                    
                    placeText.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(placeText);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
