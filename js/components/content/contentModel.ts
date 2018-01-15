import {EventUtility, HashTable, Highlight, SharedUtility} from "../../utils/index";
import { OptionsMenu } from "../optionsMenu/optionsMenu";

export class Content {
    constructor() {
        $('.js-toolbar').hide();
        this.init();
    }

    init() {
        const self: Content = this;
        EventUtility.addListener(EventUtility.DOC_PARSED, function (ele) {
            $('.js-statement').empty().html(Highlight.highlightSuggestions());
            $('.js-error').click( function(evt) {
                self.showSuggestionsMenu($(this).offset(), $(this).text());
            });
            $('.js-toolbar').show();
        });

        EventUtility.addListener(EventUtility.SET_SUGGESTION, function(evt){
           let {errorText, suggestion} = evt.details;

           let statement = $('.js-statement');
           let currentHtml = statement.html();
               currentHtml = currentHtml.replace(SharedUtility.suggestionsHash.getValue(errorText), suggestion);

           statement.empty().html(currentHtml);
           $('.js-error').click( function(evt) {
                self.showSuggestionsMenu($(this).offset(), $(this).text());
           });
        });
    }

    showSuggestionsMenu(offset, suggestion: string ) {
        $('#js-menu-grammar').remove();
        const suggestions = SharedUtility.getSuggestion;
        let {better} = suggestions.filter((item) => {
            if(item.bad === suggestion)
                return item;
        })[0];

        let content: JQuery = $('.js-statement');
            content.append(OptionsMenu.addMenu(suggestion, better));
        this.positionMenu(offset, '#js-menu-grammar');
    }

    positionMenu(offset, ele: string){
        let {left, top} = offset;
        $(ele).css('left', left - 300)
        .css('top', top + 20)
        .css('display','inline')
        .css("position", "absolute");
    }
}
