"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
exports.schema = {
    body: {
        search: joi_1.default.string().required()
    }
};
var songsvalidate = {
    body: {
        songsName: joi_1.default.string().required(),
        artistName: joi_1.default.string().required(),
        songsType: joi_1.default.string().required()
    }
};
