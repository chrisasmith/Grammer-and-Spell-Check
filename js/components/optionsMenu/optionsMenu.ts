import './optionsMenu.css';
import { EventUtility } from "../../utils/index";

export class OptionsMenu {
    constructor(){

    }
    static addMenu(errorText:string, suggestions: string[]) {
        const htmlOptsMenu = $(require("../optionsMenu/optionsMenu.html!text"));
        let optionsTable = htmlOptsMenu.find('#js-options-table');

        suggestions.map((suggestion) => {
            let htmlOpt = $(require("../optionsMenu/option.html!text"));
            let opt = htmlOpt.find('#js-opt-text');
            opt.html(suggestion);

            optionsTable.prepend(htmlOpt);
        });
        let htmlOptHeader = $(require("../optionsMenu/optionHeader.html!text"));
        optionsTable.prepend(htmlOptHeader);
        let option = optionsTable.find('.js-option');

        option.click(function(){
            OptionsMenu.removeMenu();
            EventUtility.announceEvt(EventUtility.SET_SUGGESTION, {
                errorText,
                suggestion: ($(this).attr('id') === 'js-ignore') ? errorText : $(this).text().trim()
            });
        });
        return htmlOptsMenu;
    }

    setSuggestion(errorText: string, suggestion: string){
        EventUtility.announceEvt(EventUtility.SET_SUGGESTION, {
            errorText, suggestion
        });
    }
    static removeMenu() {
        $('#js-menu-grammer').remove();
    }
}