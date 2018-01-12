class EventUtil {
    private builder = document.querySelector('.builder');
    constructor(){

    }
    announceEvt(evt: string){
        this.builder.dispatchEvent(evt);
    }
    addListener(evt, callback){
        this.builder.addEventListener(evt, callback, false);
    }
}

export const EventUtility: EventUtil = new EventUtil();