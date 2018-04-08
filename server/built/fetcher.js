"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var md5_1 = require("md5");
var feed_parse_lib_1 = require("feed-parse-lib");
var loop = function (sources) {
    var hashMap = new Map();
    return Observable.interval(60000).mergeMap(function () {
        return Observable.of.apply(Observable, sources).concatMap(function (source) { return __awaiter(_this, void 0, void 0, function () {
            var feedRawData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(source.url)];
                    case 1: return [4 /*yield*/, (_a.sent()).text()];
                    case 2:
                        feedRawData = _a.sent();
                        return [2 /*return*/, __assign({}, source, { feedRawData: feedRawData })];
                }
            });
        }); }).filter(function (feed) {
            var hash = md5_1.default(feed.feedRawData);
            if (hashMap[feed.url] === hash) {
                return false;
            }
            hashMap[feed.url] = hash;
            return true;
        }).catch(function (error) {
            console.error("fetch failure : " + error.message); // TODO 如何向外抛出错误
            return Observable.of(null);
        });
    });
};
exports.fetchFeedSources = function (feeds, listenFn) {
    var feedObservable = loop(feeds);
    feedObservable.subscribe(function (feed) { return __awaiter(_this, void 0, void 0, function () {
        var parsedFeed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!feed) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, feed_parse_lib_1.parseFeed(feed.feedRawData)];
                case 1:
                    parsedFeed = _a.sent();
                    return [2 /*return*/, listenFn(null, parsedFeed)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, listenFn(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    return function () { return subscription.unsubscribe(); }; // TODO: next complete
};
//# sourceMappingURL=fetcher.js.map