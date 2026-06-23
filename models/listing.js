const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const placeholderImageUrl = "https://www.monstertreeservice.com/cms/thumbnails/24/1080x540/images/articles/GettyImages-476116580.jpg";

const listingSchema = new Schema({ 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: placeholderImageUrl,
            set: (v) => v === "" ? placeholderImageUrl : v
        }
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


listingSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        });
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;