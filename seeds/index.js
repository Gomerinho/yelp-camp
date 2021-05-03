const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

mongoose.connect(
	'mongodb+srv://marvin-admin:vSWE1Z6YmQjNYPVB@cluster0.hixda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error :'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '6090031ea583932ea847b9c3',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod unde modi illum, officia ipsam tenetur !',
			price: price,
			geometry: {
				type: 'Point',
				coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
			},
			images: [
				{
					url:
						'https://res.cloudinary.com/duwb68vgk/image/upload/v1619716592/YelpCamp/s6mxbsmfwedwrlgui34c.jpg',
					filename: 'YelpCamp/s6mxbsmfwedwrlgui34c'
				},
				{
					url:
						'https://res.cloudinary.com/duwb68vgk/image/upload/v1619716592/YelpCamp/magvormgx2fechaitaxt.jpg',
					filename: 'YelpCamp/magvormgx2fechaitaxt'
				}
			]
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
