const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Review = require('./review');
const Schema = mongoose.Schema;

// https://res.cloudinary.com/duwb68vgk/image/upload/w_300/v1619720257/YelpCamp/kszrx74vq2mxiti3fsrs.jpg

const ImageSchema = new Schema({
	url: String,
	filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
	return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema(
	{
		title: String,
		images: [ ImageSchema ],
		price: Number,
		description: String,
		geometry: {
			type: {
				type: String,
				enum: [ 'Point' ],
				required: true
			},
			coordinates: {
				type: [ Number ],
				required: true
			}
		},
		location: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Review'
			}
		]
	},
	opts
);

CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
	return `<strong><a href='/campgrounds/${this
		._id}'>${this.title}</a><strong><p>${this.description.substring(0, 20)}...</p>`;
});

CampgroundSchema.post('findOneAndDelete', async (doc) => {
	if (doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews
			}
		});
	}
});

module.exports = mongoose.model('Campground', CampgroundSchema);
