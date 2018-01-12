"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jquery");
require("bootstrapJs");
var index_1 = require("./components/index");
var Main = (function () {
    function Main() {
        this.htmlHeader = $(require("./components/header/header.html!text"));
        this.htmlSidebar = $(require("./components/sidebar/sidebar.html!text"));
        this.htmlStageArea = $(require("./components/content/content.html!text"));
        this.builderArea = $(".builder");
    }
    Main.prototype.init = function () {
        var _this = this;
        return function (header, sidebar, stage) {
            console.log('CALLED...');
            _this.addHeader(header).addSidebar(sidebar).addStageArea(stage);
        };
    };
    Main.prototype.addHeader = function (header) {
        this.builderArea.append(header);
        this.headerArea = new index_1.Header();
        return this;
    };
    Main.prototype.addSidebar = function (sidebar) {
        this.builderArea.append(sidebar);
        this.sidebar = new index_1.Sidebar();
        return this;
    };
    Main.prototype.addStageArea = function (stage) {
        this.builderArea.append(stage);
        this.stageArea = new index_1.Content();
        return this;
    };
    return Main;
}());
var loadUI = function () {
    var ui = new Main();
    ui.init()(ui.htmlHeader, ui.htmlSidebar, ui.htmlStageArea);
};
loadUI();
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/main.js.map