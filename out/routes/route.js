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
var express_1 = __importDefault(require("express"));
var controller = __importStar(require("../controller/search"));
var mapping = __importStar(require("../controller/mapping"));
var typeAhead = __importStar(require("../controller/typeAhead"));
exports.router = express_1.default.Router({ caseSensitive: false });
try {
    exports.router.post('/createIndex', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.createIndex(req, res)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/deleteIndex', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.deleteIndex(req, res)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/deleteData', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.deleteData(req, res)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.update(req, res)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/updateByQuery', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.updateByQuery(req, res)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/reindex', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.reindex(req, res)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/addDocument', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.addDocument(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/bulkData', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.bulkData(req, res)];
                case 1:
                    data = _a.sent();
                    res.send("success");
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.search(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/interval', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.interval(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/match', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.match(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/mapping', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.mapping(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/prefixElement', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.prefixElement(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/searchPrefix', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.search(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/typeAhed', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeAhead.typeAhed(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/analyzer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.analyzer(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/analyze', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.analyze(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/tokenizer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.tokenizer(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/tokenize', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.tokenize(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/geoQuery', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.geoQuery(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/location', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.locationSearch(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/bulk', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, controller.bulkOperation(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/fuzzySearch', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.fuzzySearch(req, res)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
    exports.router.post('/test', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapping.test(req, res)];
                case 1:
                    data = _a.sent();
                    console.log("data=========", typeof (data));
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
}
catch (err) {
    console.log("******************************************", err);
}
