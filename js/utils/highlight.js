"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var Highlight = (function () {
    function Highlight() {
    }
    Highlight.highlightSuggestions = function () {
        var newText = index_1.SharedUtility.getStatement;
        var suggestions = index_1.SharedUtility.getSuggestion;
        var _hashTable = new index_1.HashTable(suggestions.length);
        var previousSpanStart = -1;
        for (var suggestionIndex = suggestions.length - 1; suggestionIndex >= 0; suggestionIndex--) {
            var suggestion = suggestions[suggestionIndex];
            if (!suggestion.used) {
                var spanStart = suggestion.offset;
                var spanEnd = spanStart + suggestion.length;
                if (previousSpanStart != -1 && spanEnd > previousSpanStart) {
                    continue;
                }
                previousSpanStart = spanStart;
                var suggestionLink = "<span id=\"suggestion_" + suggestionIndex + "\" class=\"js-error grammarError\">" + newText.substring(spanStart, spanEnd) + "</span>";
                _hashTable.insert(newText.substring(spanStart, spanEnd), suggestionLink);
                index_1.SharedUtility.suggestionsHash = _hashTable;
                newText = "" + newText.substring(0, spanStart) + suggestionLink + newText.substring(spanEnd);
                suggestion.used = true;
            }
        }
        return newText;
    };
    return Highlight;
}());
exports.Highlight = Highlight;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/utils/highlight.js.map