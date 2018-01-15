import {EventUtility} from "../../../utils/index";

export class Item {
    constructor(public _suggestions){
    }

    init(id: string, errorText: string){
        let itemOptions:JQuery = $(id + ' .js-item-options');
        //itemOptions.empty();
        this._suggestions.map(item => {
            let htmlOption = $(require("./option.html!text"));
            let optTitle = htmlOption.find('.js-opt-title').text(item);
            itemOptions.append(htmlOption);

            let suggestionBtn:JQuery = htmlOption.find('.js-btn');
            suggestionBtn.click(function(errorText: string, suggestion: string){
                EventUtility.announceEvt(EventUtility.SET_SUGGESTION, {
                    errorText,  suggestion
                });
            }.bind(null, errorText, item));
        });
    }
}