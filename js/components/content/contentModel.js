"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../utils/index");
var optionsMenu_1 = require("../optionsMenu/optionsMenu");
var Content = (function () {
    function Content() {
        $('.js-toolbar').hide();
        this.init();
    }
    Content.prototype.init = function () {
        var self = this;
        index_1.EventUtility.addListener(index_1.EventUtility.DOC_PARSED, function (ele) {
            $('.js-statement').empty().html(index_1.Highlight.highlightSuggestions());
            $('.js-error').click(function (evt) {
                self.showSuggestionsMenu($(this).offset(), $(this).text());
            });
            $('.js-toolbar').show();
        });
        index_1.EventUtility.addListener(index_1.EventUtility.SET_SUGGESTION, function (evt) {
            var _a = evt.details, errorText = _a.errorText, suggestion = _a.suggestion;
            var statement = $('.js-statement');
            var currentHtml = statement.html();
            currentHtml = currentHtml.replace(index_1.SharedUtility.suggestionsHash.getValue(errorText), suggestion);
            statement.empty().html(currentHtml);
            $('.js-error').click(function (evt) {
                self.showSuggestionsMenu($(this).offset(), $(this).text());
            });
        });
    };
    Content.prototype.showSuggestionsMenu = function (offset, suggestion) {
        $('#js-menu-grammer').remove();
        var suggestions = index_1.SharedUtility.getSuggestion;
        var better = suggestions.filter(function (item) {
            if (item.bad === suggestion)
                return item;
        })[0].better;
        var content = $('.js-statement');
        content.append(optionsMenu_1.OptionsMenu.addMenu(suggestion, better));
        this.positionMenu(offset, '#js-menu-grammer');
    };
    Content.prototype.positionMenu = function (offset, ele) {
        var left = offset.left, top = offset.top;
        $(ele).css('left', left - 300)
            .css('top', top + 20)
            .css('display', 'inline')
            .css("position", "absolute");
    };
    return Content;
}());
exports.Content = Content;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/components/content/contentModel.js.map