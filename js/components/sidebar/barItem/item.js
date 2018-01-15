"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../utils/index");
var Item = (function () {
    function Item(_suggestions) {
        this._suggestions = _suggestions;
    }
    Item.prototype.init = function (id, errorText) {
        var itemOptions = $(id + ' .js-item-options');
        this._suggestions.map(function (item) {
            var htmlOption = $(require("./option.html!text"));
            var optTitle = htmlOption.find('.js-opt-title').text(item);
            itemOptions.append(htmlOption);
            var suggestionBtn = htmlOption.find('.js-btn');
            suggestionBtn.click(function (errorText, suggestion) {
                index_1.EventUtility.announceEvt(index_1.EventUtility.SET_SUGGESTION, {
                    errorText: errorText, suggestion: suggestion
                });
            }.bind(null, errorText, item));
        });
    };
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/components/sidebar/barItem/item.js.map