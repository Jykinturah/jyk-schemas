module.exports = function(mongoose) {

  var wordCountSchema = new mongoose.Schema({
    discord_id:       String,
    reminder_time:    String,
    reminder_enable:  Boolean,
    // Every update, update total Sum.
    count_total:      Number,
    // Every Day, keep one count per day and sum it
    current_year:     Number,
    count_day:    {
      type: Map,
      of:   Number
    },
    // Every Month, aggregate count by Month
    count_month:  {
      type: Map,
      of:   Number
    },
    // Every Year, aggregate count by Year
    count_year:   {
      type: Map,
      of:   Number
    }
  });

  return mongoose.model('wordCount', wordCountSchema);
};