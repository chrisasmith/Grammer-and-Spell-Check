class EventUtil {
    public FILE_LOADED: string = 'FILE_LOADED';
    public DOC_PARSED: string = 'DOC_PARSED';
    public SET_SUGGESTION: string = 'SET_SUGGESTION';
    public REFRESH_STATEMENT: string = 'REFRESH_STATEMENT';

    private _eventTypes = [this.FILE_LOADED, this.DOC_PARSED, this.SET_SUGGESTION, this.REFRESH_STATEMENT];
    private _myEvents = [];
    private builder = document.querySelector('.js-app');
    constructor(){
        this._eventTypes.map((evt, idx) => {
            this._myEvents[evt] = new Event(evt , {details:{}});
        })
    }
    announceEvt(evt: string, prop = {}){
        this._myEvents[evt].details = prop;
        this.builder.dispatchEvent(this._myEvents[evt]);
    }
    addListener(evt, callback){
        this.builder.addEventListener(evt, callback, false);
    }
}

export const EventUtility: EventUtil = new EventUtil();