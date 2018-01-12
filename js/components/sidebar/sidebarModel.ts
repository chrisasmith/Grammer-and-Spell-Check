import {getGrammerSpellingUrl, SharedUtility, EventUtility} from "../../utils/index";
import axios from 'axios';
import { Item } from '../index';

export class Sidebar {
    private docLoaded = new Event('DOC_LOADED');
    private barItems = [];
    constructor() {
        const self: Sidebar = this;
       $('.js-refresh').click(function() {
           console.log("Clicking... Button", this);
           self.sendImportedText();
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
        const grammerText = "My mother are a doctor, but my father is a angeneer. I has a gun."; //textField.value;

        SharedUtility.setStatement = grammerText;

        this.searchForErrors(grammerText).then((data) =>{
            SharedUtility.setSuggestions = data;
            this.createSuggestions(data);
            EventUtility.announceEvt(this.docLoaded);
        });
    }
    createSuggestions(data){
        const errorDiv:JQuery = $('.errors');
        errorDiv.empty();
        data.map((item, idx) => {
            let htmlItem = $(require("./barItem/item.html!text"));
            errorDiv.append(htmlItem);

            let id:string = `item_${item.id}_${item.offset}`;
            $(htmlItem).attr('id', id);

            let title:JQuery = $(htmlItem).find('.title');
                title.html(item.bad);
            this.barItems[idx] = new Item(item.better);
            this.barItems[idx].init(`#${id}`);
        })
    }
}


