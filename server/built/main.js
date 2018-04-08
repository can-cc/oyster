"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var feedjs_1 = require("feedjs");
var express_1 = require("express");
var path_1 = require("path");
var db_1 = require("./db");
var colors_1 = require("colors");
var fs_1 = require("fs");
var feedsFilePath = path_1.default.join(process.env.HOME, '.feeds');
function checkFeedFileExist() {
    if (!fs_1.default.existsSync(feedsFilePath)) {
        console.log('check your `~/.feeds` file');
        process.exit();
    }
}
function getFeeds() {
    return JSON.parse(fs_1.default.readFileSync(feedsFilePath, 'utf8'));
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var feedSources, app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checkFeedFileExist();
                    return [4 /*yield*/, db_1.createTablesIfNotExsits()];
                case 1:
                    _a.sent();
                    feedSources = getFeeds();
                    feedjs_1.default(feedSources, function (error, feeds) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!error) return [3 /*break*/, 1];
                                    console.error(error);
                                    return [3 /*break*/, 3];
                                case 1: return [4 /*yield*/, Promise.all(feeds.map(db_1.insertToAtom))];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app = express_1.default();
                    app.get('/alive', function (req, res) {
                        res.send('I am alive');
                    });
                    app.get('/new-unread/:number', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var atoms;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, db_1.getAtoms(req.params.number)];
                                case 1:
                                    atoms = _a.sent();
                                    res.json(atoms.reverse());
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/unread/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, db_1.makeAtomRead(req.params.id)];
                                case 1:
                                    _a.sent();
                                    res.send('ok'); // NOTE: 操他妈的，一定要返回点东西emacs那个狗逼web插件才能把进程关掉，调死爸爸了
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.listen(7788);
                    console.log(colors_1.default.green("server start at http://127.0.0.1:7788"));
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=main.js.map