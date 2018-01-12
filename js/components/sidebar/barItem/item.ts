export class Item {
    constructor(public _suggestions){
    }

    init(id: string){
        let itemOptions:JQuery = $(id + ' .item-options');
        //itemOptions.empty();
        this._suggestions.map(item => {
            console.log('Item: ', item);
            itemOptions.append(`
            <div class="l-sidebar__navigation-item c-navigation__item">
            <span class="l-sidebar__navigation-title c-navigation__title">${item}</span>
            <div class="l-sidebar__navigation-buttons c-navigation__buttons">
                <div class="btn btn-circle btn-xxs btn-ns btn-green">
                    <i class="glyphicon glyphicon-plus"></i>
                </div>
            </div>
        </div>`);
        });

    }
}