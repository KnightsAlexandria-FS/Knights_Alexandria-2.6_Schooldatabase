const GeoData = require('../models/GeoData');

exports.getAllGeoData = async (req, res) => {
  try {
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    
    const queryObj = JSON.parse(queryStr);
    const excludedFields = ['select', 'sort', 'page', 'limit'];
    excludedFields.forEach((param) => delete queryObj[param]);

    let query = GeoData.find(queryObj);

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-fetchedAt');
    }
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const geoDataList = await query;

    res.status(200).json({
      data: geoDataList,
      success: true,
      message: `${req.method} - request to GeoData endpoint`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};