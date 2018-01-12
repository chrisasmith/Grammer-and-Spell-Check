"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hashTable_1 = require("./hashTable");
var SharedUtil = (function () {
    function SharedUtil() {
        this._suggestions = [];
    }
    Object.defineProperty(SharedUtil.prototype, "getStatement", {
        get: function () {
            return this._statementObj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedUtil.prototype, "setStatement", {
        set: function (statement) {
            var statementArr = statement.split(" ");
            this.hashTable = new hashTable_1.HashTable(statementArr.length);
            this.setUpHashTable(statementArr);
            this._statementObj = statement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedUtil.prototype, "getSuggenstion", {
        get: function () {
            return this._suggestions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedUtil.prototype, "setSuggestions", {
        set: function (suggestions) {
            this._suggestions = suggestions;
        },
        enumerable: true,
        configurable: true
    });
    SharedUtil.prototype.setUpHashTable = function (values) {
        var _this = this;
        values.forEach(function (value) {
            _this.hashTable.insert(value, value);
        });
        console.log(this.hashTable);
    };
    return SharedUtil;
}());
exports.SharedUtility = new SharedUtil();
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/utils/shared.js.map