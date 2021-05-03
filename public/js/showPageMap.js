const goodCampground = JSON.parse(campground);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v11', // style URL
	center: goodCampground.geometry.coordinates, // starting position [lng, lat]
	zoom: 9 // starting zoom
});

new mapboxgl.Marker()
	.setLngLat(goodCampground.geometry.coordinates)
	.setPopup(
		new mapboxgl.Popup({ offset: 25 }).setHTML(`<h5>${goodCampground.title}</h5><p>${goodCampground.location}`)
	)
	.addTo(map);

map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
