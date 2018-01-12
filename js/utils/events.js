"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventUtil = (function () {
    function EventUtil() {
        this.builder = document.querySelector('.builder');
    }
    EventUtil.prototype.announceEvt = function (evt) {
        this.builder.dispatchEvent(evt);
    };
    EventUtil.prototype.addListener = function (evt, callback) {
        this.builder.addEventListener(evt, callback, false);
    };
    return EventUtil;
}());
exports.EventUtility = new EventUtil();
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/utils/events.js.map