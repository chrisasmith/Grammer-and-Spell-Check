import {EventUtility, SharedUtility} from "../../utils/index";

export class Content {
    constructor() {
        EventUtility.addListener('DOC_LOADED', function(ele){
            console.log('Got Event: ', ele);
            $('.js-statement').empty().text(SharedUtility.getStatement);
        });
    }
}