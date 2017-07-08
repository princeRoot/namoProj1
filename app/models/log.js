var mongoose = require('mongoose');

var logSchema = mongoose.Schema({

        email        : String,
        password :String,
});

logSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('log', logSchema);