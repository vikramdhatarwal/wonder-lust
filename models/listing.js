const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeholderImageUrl = "https://www.monstertreeservice.com/cms/thumbnails/24/1080x540/images/articles/GettyImages-476116580.jpg";

const listingSchema = new Schema({ 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
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
        
    },
    location: {
        type: String,
        
    },
    country: {
        type: String,
        
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;