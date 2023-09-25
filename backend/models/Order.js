const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    comment: String,
    menu: String,
    orderNumber: Number,
});

module.exports = mongoose.model('Order', orderSchema);
