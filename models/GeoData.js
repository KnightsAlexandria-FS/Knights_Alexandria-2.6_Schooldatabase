const mongoose = require('mongoose');

const geoDataSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  weatherData: {
    temp: Number,
    humidity: Number,
    description: String
  },
  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GeoData', geoDataSchema);