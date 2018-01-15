"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventUtil = (function () {
    function EventUtil() {
        var _this = this;
        this.FILE_LOADED = 'FILE_LOADED';
        this.DOC_PARSED = 'DOC_PARSED';
        this.SET_SUGGESTION = 'SET_SUGGESTION';
        this.REFRESH_STATEMENT = 'REFRESH_STATEMENT';
        this._eventTypes = [this.FILE_LOADED, this.DOC_PARSED, this.SET_SUGGESTION, this.REFRESH_STATEMENT];
        this._myEvents = [];
        this.builder = document.querySelector('.js-app');
        this._eventTypes.map(function (evt, idx) {
            _this._myEvents[evt] = new Event(evt, { details: {} });
        });
    }
    EventUtil.prototype.announceEvt = function (evt, prop) {
        if (prop === void 0) { prop = {}; }
        this._myEvents[evt].details = prop;
        this.builder.dispatchEvent(this._myEvents[evt]);
    };
    EventUtil.prototype.addListener = function (evt, callback) {
        this.builder.addEventListener(evt, callback, false);
    };
    return EventUtil;
}());
exports.EventUtility = new EventUtil();
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/utils/events.js.map