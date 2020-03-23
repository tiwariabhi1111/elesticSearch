import mongoose from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');

//  SCHEMA FOR SONGS
let Schema = mongoose.Schema;
const songsSchema = new Schema({
    songs: { type: String },
    artist: { type: String },
    songsType: { type: String },
    createdAt: { type: Date, default: new Date() }

});
songsSchema.plugin(uniqueValidator);


export let songsModel = mongoose.model('songs', songsSchema)

