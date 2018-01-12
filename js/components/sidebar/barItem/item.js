"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Item = (function () {
    function Item(_suggestions) {
        this._suggestions = _suggestions;
    }
    Item.prototype.init = function (id) {
        var itemOptions = $(id + ' .item-options');
        this._suggestions.map(function (item) {
            console.log('Item: ', item);
            itemOptions.append("\n            <div class=\"l-sidebar__navigation-item c-navigation__item\">\n            <span class=\"l-sidebar__navigation-title c-navigation__title\">" + item + "</span>\n            <div class=\"l-sidebar__navigation-buttons c-navigation__buttons\">\n                <div class=\"btn btn-circle btn-xxs btn-ns btn-green\">\n                    <i class=\"glyphicon glyphicon-plus\"></i>\n                </div>\n            </div>\n        </div>");
        });
    };
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/components/sidebar/barItem/item.js.map