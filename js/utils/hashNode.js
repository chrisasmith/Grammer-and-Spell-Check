"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HashNode = (function () {
    function HashNode(key, value, next) {
        if (next === void 0) { next = null; }
        this.key = "";
        this.key = key;
        this.value = value;
        this.next = next || null;
    }
    return HashNode;
}());
exports.HashNode = HashNode;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/utils/hashNode.js.map