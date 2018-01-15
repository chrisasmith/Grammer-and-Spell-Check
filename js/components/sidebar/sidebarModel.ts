import {getGrammerSpellingUrl, SharedUtility, EventUtility, ReadFile} from "../../utils/index";
import axios from 'axios';
import { Item } from '../index';

export class Sidebar {
    private barItems = [];
    private currentSuggestions;
    constructor() {
        ReadFile.loadFile();
        const self: Sidebar = this;
        EventUtility.addListener(EventUtility.FILE_LOADED, function(ele){
           SharedUtility.setStatement = ele.details.results;
           $('.js-filename').text(ele.details.filename);
           self.sendImportedText();
        });

        EventUtility.addListener(EventUtility.SET_SUGGESTION, function(evt){
            console.log('Set Suggestions: ', evt);
            let {errorText, suggestion} = evt.details;
            let suggestions = self.currentSuggestions.filter((item) => {
                if(item.bad !== errorText)
                    return item;
            });
            console.table(suggestions);
            self.createSuggestions(suggestions);
            self.currentSuggestions = suggestions;
        });
    }
    private checkDocument = async function (docText) {
        return axios.get( getGrammerSpellingUrl( docText ) );
    };

    private searchForErrors = async function ( text )  {
        const self: Sidebar = this;
        const [ suggestions ]: any = await Promise.all( [
            self.checkDocument( text )
        ] ).catch((error) => {
            console.log("Error: ", error);
        });
        return suggestions.data.errors;
    };

    sendImportedText() {
        const textField = $('.js-text-field');
        this.searchForErrors(SharedUtility.getStatement).then((data) =>{
            data.map( (item) => {
                item.used = false;
            });

            SharedUtility.setSuggestions = this.currentSuggestions = data;
            this.createSuggestions(data);
            EventUtility.announceEvt(EventUtility.DOC_PARSED);
        });
    }
    createSuggestions(data){
        const errorDiv:JQuery = $('.js-errors');
        errorDiv.empty();
        data.map((item, idx) => {
            let htmlItem = $(require("./barItem/item.html!text"));
            errorDiv.append(htmlItem);

            let id:string = `item_${item.id}_${item.offset}`;
            $(htmlItem).attr('id', id);

            let title:JQuery = $(htmlItem).find('.title');
                title.html(item.bad);
            this.barItems[idx] = new Item(item.better);
            this.barItems[idx].init(`#${id}`, item.bad);

            let ignoreBtn:JQuery = htmlItem.find('.js-ignore-suggestion');
            ignoreBtn.click(function(){
                EventUtility.announceEvt(EventUtility.SET_SUGGESTION, {
                    errorText: $(this).text().trim(), suggestion: $(this).text().trim()
                });
            });
        })
    }
}