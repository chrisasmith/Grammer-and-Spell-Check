"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./optionsMenu.css");
var index_1 = require("../../utils/index");
var OptionsMenu = (function () {
    function OptionsMenu() {
    }
    OptionsMenu.addMenu = function (errorText, suggestions) {
        var htmlOptsMenu = $(require("../optionsMenu/optionsMenu.html!text"));
        var optionsTable = htmlOptsMenu.find('#js-options-table');
        suggestions.map(function (suggestion) {
            var htmlOpt = $(require("../optionsMenu/option.html!text"));
            var opt = htmlOpt.find('#js-opt-text');
            opt.html(suggestion);
            optionsTable.prepend(htmlOpt);
        });
        var htmlOptHeader = $(require("../optionsMenu/optionHeader.html!text"));
        optionsTable.prepend(htmlOptHeader);
        var option = optionsTable.find('.js-option');
        option.click(function () {
            OptionsMenu.removeMenu();
            index_1.EventUtility.announceEvt(index_1.EventUtility.SET_SUGGESTION, {
                errorText: errorText,
                suggestion: ($(this).attr('id') === 'js-ignore') ? errorText : $(this).text().trim()
            });
        });
        return htmlOptsMenu;
    };
    OptionsMenu.removeMenu = function () {
        $('#js-menu-grammar').remove();
    };
    return OptionsMenu;
}());
exports.OptionsMenu = OptionsMenu;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/components/optionsMenu/optionsMenu.js.map