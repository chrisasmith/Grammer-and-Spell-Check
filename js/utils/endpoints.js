"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants/constants");
var utf8Encoding = function (text) { return encodeURI(text); };
exports.getGrammerSpellingUrl = function (fieldText) {
    console.log("Search String: ", fieldText);
    var apiUrl = "https://api.textgears.com/check.php?key=" + constants_1.GRAMMER_API + "&text=" + utf8Encoding(fieldText);
    console.log("apiUrl: ", apiUrl);
    return apiUrl;
};
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/utils/endpoints.js.map