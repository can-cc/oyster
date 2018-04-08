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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
var ramda_1 = require("ramda");
var xml2js_1 = require("xml2js");
var parseATOM = function (entrys) {
    return entrys.map(function (entry) {
        var title = entry.title[0]._ || entry.title[0];
        var link = entry.link[0].$.href;
        var content = ramda_1.default.path([0, '_'])(entry.content);
        var summary = ramda_1.default.path([0, '_'])(entry.summary);
        var published = ramda_1.default.path(0)(entry.published);
        var updated = ramda_1.default.path(0)(entry.updated);
        var author = ramda_1.default.path([0, 'name', 0])(entry.author);
        return { title: title, link: link, content: content, summary: summary, published: published, updated: updated, author: author };
    });
};
var parseRSS2 = function (entrys) {
    return entrys.map(function (entry) {
        var title = entry.title[0];
        var link = entry.link[0];
        var content = entry.description[0];
        var published = moment_1.default(entry.pubDate[0]).toDate().getTime();
        var author = ramda_1.default.path(0)(entry.author);
        var creator = ramda_1.default.path(['dc:creator', 0])(entry);
        return { title: title, link: link, content: content, published: published, author: author };
    });
};
var checkFeedStandard = function (feed) {
    if (!!feed.rss) {
        return 'RSS2';
    }
    if (!!feed.feed.entry) {
        return 'ATOM';
    }
};
function parseXml(rawXmlData) {
    return new Promise(function (resolve, reject) {
        xml2js_1.default.parseString(rawXmlData, function (error, result) {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}
exports.parseFeed = function (rawData) { return __awaiter(_this, void 0, void 0, function () {
    var parsedXml;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, parseXml(rawData)];
            case 1:
                parsedXml = _a.sent();
                switch (checkFeedStandard(parsedXml)) {
                    case 'RSS2':
                        return [2 /*return*/, ramda_1.default.flatten(parseRSS2(parsedXml.rss.channel[0].item))];
                    case 'ATOM':
                        return [2 /*return*/, ramda_1.default.flatten(parseATOM(parsedXml.feed.entry))];
                    default:
                        return [2 /*return*/, []];
                }
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=parser.js.map