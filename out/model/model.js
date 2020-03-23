"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var uniqueValidator = require('mongoose-unique-validator');
//  SCHEMA FOR SONGS
var Schema = mongoose_1.default.Schema;
var songsSchema = new Schema({
    songs: { type: String },
    artist: { type: String },
    songsType: { type: String },
    createdAt: { type: Date, default: new Date() }
});
songsSchema.plugin(uniqueValidator);
exports.songsModel = mongoose_1.default.model('songs', songsSchema);
