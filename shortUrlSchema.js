module.exports = function(mongoose) {

  var shortUrlSchema = new mongoose.Schema({
    original_url: String,
    short_id: String
  });

  return mongoose.model('shortUrl', shortUrlSchema);
};