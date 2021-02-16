const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        first: { type: String, required: true  },
        middle: { type: String },
        last: { type: String }
    },
    dateOfBirth:  { type: Date, required: true },
    gender: { type: Number },
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    phone: { type: String, unique: true, required: true }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);