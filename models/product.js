var mongoose = require('mongoose');
var mongoosePaginator = require('mongoose-paginator-simple');

var Schema   = mongoose.Schema;




var Products = new Schema({
		prodcode: String,
		prodname: String,
		extra: Boolean,
		qtemin: Number
});

Products.plugin(mongoosePaginator);



module.exports = mongoose.model('Products', Products);
