"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch_1 = __importDefault(require("elasticsearch"));
/// <reference path="../model/interface.ts" />
var model_1 = require("../model/model");
var artist = __importStar(require("../model/songsFile"));
var client = new elasticsearch_1.default.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.2',
});
//CREATE INDEX****************************************************************
exports.createIndex = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                    console.log("index", req.body.indexName);
                    client.indices.create({
                        index: req.body.indexName
                    }, function (err, resp, status) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(resp);
                        }
                    });
                }).then(function (msg) {
                    return msg;
                }).catch(function (err) { return err; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//DELETE INDEX ******************************************************************
exports.deleteIndex = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                    client.indices.delete({
                        index: req.body.indexName
                    }, function (err, resp) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(resp);
                        }
                    });
                }).then(function (msg) {
                    return msg;
                }).catch(function (err) { return err; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//REINDEX
exports.reindex = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                    client.reindex({
                        body: {
                            "source": {
                                "index": req.body.sourceIndex,
                            },
                            "dest": {
                                "index": req.body.destIndex
                            }
                            // "source": {
                            //     "index": req.body.sourceIndex,
                            //     "query": {
                            //         "match": {
                            //             "songs": "dil"
                            //         }
                            //     }
                            // },
                            // "dest": {
                            //     "index": req.body.destIndex,
                            //     // "routing": "=cat"
                            // }
                        }
                    }, function (err, resp) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(resp);
                        }
                    });
                }).then(function (msg) {
                    return msg;
                }).catch(function (err) { return err; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//INSERT DOCUMENT INTO MONGO AS WELL AS ELASTIC**********************************
// it can also  update the data on the given id
exports.addDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // let mongoStatus = await songsModel.create(req.body.data)
                // if (mongoStatus) {
                console.log("*********************DATA SUCCESSFULLY INSERTED INTO MONGO****************************");
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.create({
                            index: req.body.indexName,
                            type: "_doc",
                            id: req.body.id,
                            body: req.body.data
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//INSERT BULK DATA*************************************************** 
exports.bulkData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var count, a, b, c;
    return __generator(this, function (_a) {
        count = 1;
        a = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, element, mongoStatus;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = artist.alka_yagnik;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            element = _a[_i];
                            return [4 /*yield*/, model_1.songsModel.create(element)];
                        case 2:
                            mongoStatus = _b.sent();
                            client.create({
                                index: "myplaylist",
                                type: "songs",
                                id: count,
                                body: element
                            });
                            count++;
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        b = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, element, mongoStatus;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = artist.kumar_sanu;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            element = _a[_i];
                            return [4 /*yield*/, model_1.songsModel.create(element)];
                        case 2:
                            mongoStatus = _b.sent();
                            client.create({
                                index: "myplaylist",
                                type: "songs",
                                id: count,
                                body: element
                            });
                            count++;
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        c = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, element, mongoStatus;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = artist.neha_kakkad;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            element = _a[_i];
                            return [4 /*yield*/, model_1.songsModel.create(element)];
                        case 2:
                            mongoStatus = _b.sent();
                            client.create({
                                index: "myplaylist",
                                type: "songs",
                                id: count,
                                body: element
                            });
                            count++;
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        a();
        b();
        c();
        return [2 /*return*/];
    });
}); };
// NORMAL SEARCH FROM ELASTIC(with specified field)
//match data with the exact word and return document
//search indivisual world from the index 
exports.search = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.search({
                            index: req.body.indexName,
                            // type: "songs",
                            from: 0,
                            size: 20,
                            body: {
                                // query: {
                                //     match: {
                                //         songs: req.body.data
                                //     },
                                // }
                                // "query": {
                                //     "bool": {
                                //         "must": [
                                //             { "match": { "songs": req.body.data } },
                                // { "match": { "artist": "alka Yagnik" } }
                                // ],
                                // "must_not": [
                                //     { "match": { "songs": "Dhadkan" } },
                                //     { "match": { "artist": "kumar sanu" } }
                                // ],
                                // "filter": [{ "term": { "songsType": "hindi" } }]
                                // }
                                // }
                                // "query": {
                                //     "common": {
                                //         "songs": {
                                //             "query": req.body.data,
                                //             "cutoff_frequency": 0.001
                                //         }
                                //     }
                                // }
                                //TERM LEVEL QUERY
                                "query": {
                                // "match": {
                                //     "songsType": req.body.data
                                // }
                                //   EXIST QUERY
                                // "exists": {
                                //     "field": "artist1"
                                // },
                                // "term": {
                                //     "songsType": req.body.data
                                // }
                                //PREFIX QUERY
                                // "prefix": { "songs": "mil" }
                                //WILDCARD QUERY
                                // "wildcard": {
                                //     "songs": {
                                //         "value": "m*e",
                                //         "boost": 1.0,
                                //         "rewrite": "constant_score"
                                //     }
                                // }
                                //FUZZY QUERY
                                // "fuzzy": {
                                //     "songs": {
                                //         "value": "shi",
                                //         "boost": 1.0,
                                //         "fuzziness": 2,
                                //         "prefix_length": 0,
                                //         "max_expansions": 40
                                //     }
                                // }
                                //IDS BASED QUERY
                                // "ids": {
                                //     "type": "songs",
                                //     "values": ["1", "4", "30"]
                                // }
                                }
                            }
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.deleteData = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.deleteByQuery({
                            index: req.body.indexName,
                            // type: "songs"
                            body: {
                                "query": {
                                    "match": {
                                        // "songs": req.body.data
                                        "_id": "55"
                                    }
                                }
                            }
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
//  UPDATE DATA FROM ELASTIC
// the update query work only on the given id
exports.update = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.update({
                            index: req.body.indexName,
                            type: "songs",
                            id: req.body.id,
                            body: {
                                "script": {
                                    "source": "ctx._source.type= params.type",
                                    "params": {
                                        "type": req.body.data
                                    }
                                }
                                // we can add sone new field at the place of songs
                                //   "script": {
                                //             "source": "ctx._source.createdBy= params.name",
                                //             "lang": "painless",
                                //             "params": {
                                //                 "name": "abhishek tiwari"
                                //             }
                                //         }
                                // update data in the single field of given document             
                                // doc: {
                                //     "songs": req.body.data
                                // }
                            }
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.updateByQuery = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.updateByQuery({
                            index: req.body.indexName,
                            type: "songs",
                            body: {
                                "query": {
                                    "match_all": {
                                    // "_id": req.body.id
                                    }
                                },
                                "script": {
                                    "source": "ctx._source.author= params.author",
                                    "params": {
                                        "author": req.body.data
                                    }
                                }
                            }
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
// NOTE:-
//match_all return all document from the specified type
//match_phrase return document when whole word matches the document 
//bool query is used to make complex query
//data inside simple array will match easily but the object of array data need mapping to search tha correct data
//INTERVAL QWERIES:-*******************************************************
exports.interval = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.search({
                            index: req.body.indexName,
                            // type: "songs",
                            // from: 1,
                            // size: 30,
                            body: {
                                "query": {
                                    "intervals": {
                                        "songs": {
                                            "all_of": {
                                                "ordered": true,
                                                "intervals": [
                                                    {
                                                        "match": {
                                                            "query": req.body.query1,
                                                            "max_gaps": req.body.max_gaps,
                                                            "ordered": true
                                                        }
                                                    },
                                                    {
                                                        "any_of": {
                                                            "intervals": [
                                                                {
                                                                    "match": {
                                                                        "query": req.body.query2,
                                                                        "max_gaps": 10,
                                                                        "ordered": true
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                    // {
                                                    //     "match": {
                                                    //         "query": "Mera Dil Bhi",
                                                    //         "max_gaps": 10,
                                                    //         "filter": {
                                                    //             "not_containing": {
                                                    //                 "match": {
                                                    //                     "query": "Pagal"
                                                    //                 }
                                                    //             }
                                                    //         }
                                                    //     },
                                                    // }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
//MAX_GAPS:-
// (Optional, integer) Maximum number of positions between the matching terms. Terms further apart than this are not considered matches. Defaults to -1.If unspecified or set to -1, there is no width restriction on the match. If set to 0, the terms must appear next to each other.
//Match query****************************************************
exports.match = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.search({
                            index: req.body.indexName,
                            // type: "songs",
                            // from: 1,
                            // size: 30,
                            body: {
                                "query": {
                                    "match": {
                                        "songs": {
                                            "query": req.body.data,
                                            "operator": "and",
                                            "zero_terms_query": "all"
                                        }
                                    }
                                }
                            },
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
//NESTED QUERY
// PUT /my_index
// {
//     "mappings": {
//         "_doc" : {
//             "properties" : {
//                 "obj1" : {
//                     "type" : "nested"
//                 }
//             }
//         }
//     }
// }
// SEARCH FROM INDEZ
// GET /my_index/_search
// {
//     "query": {
//         "nested" : {
//             "path" : "obj1",
//             "query" : {
//                 "bool" : {
//                     "must" : [
//                     { "match" : {"obj1.name" : "blue"} },
//                     { "range" : {"obj1.count" : {"gt" : 5}} }
//                     ]
//                 }
//             },
//             "score_mode" : "avg"
//         }
//     }
// }
// mapping
exports.mapping = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.indices.create({
                            index: req.body.indexName,
                            // type: req.body.type,
                            body: {
                                "mappings": {
                                    "properties": req.body.data
                                }
                            }
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.bulkOperation = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client.bulk({
                            body: req.body.bulkData
                        }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(resp);
                            }
                        });
                    }).then(function (msg) {
                        return msg;
                    }).catch(function (err) { return err; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
