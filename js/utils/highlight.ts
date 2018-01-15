import {SharedUtility, HashTable} from "./index";
export class Highlight {
    static highlightSuggestions() {
        let newText = SharedUtility.getStatement;
        const suggestions = SharedUtility.getSuggestion;
        let _hashTable: HashTable = new HashTable(suggestions.length);
        let previousSpanStart = -1;
        for (let suggestionIndex = suggestions.length - 1; suggestionIndex >= 0; suggestionIndex--) {
            let suggestion = suggestions[suggestionIndex];
            if (!suggestion.used) {
                let spanStart = suggestion.offset;
                let spanEnd = spanStart + suggestion.length;
                if (previousSpanStart != -1 && spanEnd > previousSpanStart) {
                    continue;
                }
                previousSpanStart = spanStart;
                let suggestionLink: string = `<span id="suggestion_${suggestionIndex}" class="js-error grammarError">${newText.substring(spanStart, spanEnd)}</span>`;
                _hashTable.insert(newText.substring(spanStart, spanEnd), suggestionLink);

                SharedUtility.suggestionsHash = _hashTable;

                newText = `${newText.substring(0, spanStart)}${suggestionLink}${newText.substring(spanEnd)}`;

                suggestion.used = true;
            }
        }
        return newText;
    }
}
