const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const GeckoSchema = new Schema({
    name: String,
    breed: String,
    age: String,
    price: String,
    description: String,
    images: [ImageSchema]
}, opts);

module.exports = mongoose.model('Gecko', GeckoSchema);