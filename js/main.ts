import "jquery";
import "bootstrapJs";

import { Header, Sidebar, Content } from "./components/index";

class Main {
    public htmlHeader = $(require("./components/header/header.html!text"));
    public htmlSidebar = $(require("./components/sidebar/sidebar.html!text"));
    public htmlStageArea = $(require("./components/content/content.html!text"));

    private builderArea:JQuery = $(".js-app-content");

    private headerArea:Header;
    private sidebar:Sidebar;
    private stageArea:Content;

    init(){
        return (header, sidebar, stage) => {
            this.addHeader(header).addSidebar(sidebar).addStageArea(stage);
        }
    }

    addHeader(header){
        this.builderArea.append(header);
        this.headerArea = new Header();
        return this;
    }
    addSidebar(sidebar){
        this.builderArea.append(sidebar);
        this.sidebar = new Sidebar();
        return this;
    }
    addStageArea(stage){
        this.builderArea.append(stage);
        this.stageArea = new Content();
        return this;
    }
}

const loadUI = () => {
    const ui: Main = new Main();
    ui.init()(ui.htmlHeader, ui.htmlSidebar, ui.htmlStageArea);
};

loadUI();