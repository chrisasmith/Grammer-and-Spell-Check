import "jquery";
import "bootstrapJs";
import {ConfigService, LangService, SessionsSrv, SysinfoService} from "./services/index";
import { CallToAction, PopUpComponent, RatecardPopUpComponent, TocComponent } from "./components/index";
import { TrippleClick, SharedSrv, AvailableLanguages, TranslateViews, Client } from "./services/index";
import { Langs } from "./langs";
import { ActionsType, FieldsObj, AccessObject } from './models/index';
import { EvalGivenString } from './helpers/index';


export class KioskUi extends Langs {
  private configSrv: ConfigService = new ConfigService();
  private langSrv: LangService; // = new LangService();
  private sysSrv: SysinfoService = new SysinfoService();
  private config: any;
  private translations: any;
  private saSysInfo: any;
  private rateCards: any;

  private screenFields = FieldsObj.fields;
  private evalString = EvalGivenString.evalString;

  private allowFreeBPS: boolean;
  private htmlRateCards = $(require("./components/rateCards.html!text"));

  private macAddress: string = "";
  private tripleClick: TrippleClick;
  private popUp: PopUpComponent = new PopUpComponent();
  private ratePopUp: RatecardPopUpComponent = new RatecardPopUpComponent();
  private tocPopUp: TocComponent = new TocComponent();
  public currentLang: string = "en-US";

  private billingOptions = {
    card: { id: "cardHold", cat: "Labels", key: "creditCardHold" },
    room: { id: "", cat: "Labels", key: "" },
    code: { id: "", cat: "Labels", key: "" },
    comp: { id: "", cat: "Labels", key: "" }
  };

  constructor() {
    super();

    $(".cards").append(this.htmlRateCards);

    AvailableLanguages.getAvailableLangs();

    SharedSrv.setLangObj = this.screenFields;
    
    this.currentLang = AvailableLanguages.cultureCode;

    this.langSrv = new LangService(AvailableLanguages.cultureCode);
  }

  init() {
    KioskUi.checkForLang(this.langSrv).then(function(data){
      this.translations = data;
      SharedSrv.setTranslations = this.translations;
      TranslateViews.setUpHashTable(data);
      
    }.bind(this));

    this.checkForSysInfo().then(function(data){
      this.rateCards = data;
      this.macAddress = this.rateCards[0].macAddress;
      this.saSysInfo = []; // sysInfo;
      //
    }.bind(this));

    this.checkForConfig(this.screenFields).then(function(data){
      this.config = data;
      this.buildHeader(this.config);
      //
      this.setTranslationValues(data.fields);
      this.allowFreeBPS = this.config.allowFreeBPS === "true" ? true : false;
      this.setupFreeBPS(this.allowFreeBPS);
      this.checkNumberOfCards();
      //
      this.addCardActions(this.ratePopUp, this.config, this.rateCards);
      KioskUi.setBgImage(this.config);
    }.bind(this));
  }

  static checkForLang(langSrv) {
    return langSrv.getLang.then(
      data => {
        return data;
      },
      data => {
        // LOCAL
        return data;
      }
    );
  }
  // check for the config
  checkForConfig(fields) {
    return this.configSrv.getConfig.then(
      data => {
          data['fields'] = fields;
        return data;
      },
      data => {
        // LOCAL
          data['fields'] = fields;
        return data;
      }
    );
  }
  // Get the reate cards
  checkForSysInfo() {
    return this.sysSrv.getInfo.then(
      data => {
        return data;
      },
      data => {
        // LOCAL
        return data;
      }
    );
  }

  setTranslationValues(screenFields) {
    screenFields.forEach(field => {
      $(`#${field.id}`).html(TranslateViews.translate(field.id));
    });
  }

  setupFreeBPS(allowFBPS) {
    let callWin: CallToAction;
    const freeBPS = $(".free-bps");
    if (allowFBPS) {
        callWin = new CallToAction(this.addFreeBPS());
        freeBPS.append(callWin.populateTemplate());
    } else {
          freeBPS.hide();
    }
  }

  checkNumberOfCards() {
    const termsOfUse = $("#terms_use");
    switch (true) {
      case this.rateCards.length === 1:
        this.addSingleCard(this.ratePopUp, this.config, this.rateCards, KioskUi.setDialogText);
        $("#panel_subtitle").hide();

        switch (true) {
          case this.rateCards[0].mode.toLowerCase() === "comp":
              termsOfUse.addClass("comp-card");
            $("#ratecard_body").addClass("small-panel");
            break;
          case this.rateCards[0].mode.toLowerCase() === "card":
              termsOfUse.addClass("comp-card");
            break;
          default:
        }
        break;
      default:
        this.addTabs(this.ratePopUp, this.config, this.rateCards, KioskUi.setDialogText);
    }
    //
    if (!this.allowFreeBPS) {
      $(".tab-pane > div").addClass("no-bps");
    }
  }

  buildRateObjects(ratecards: any) {
    const card: any = ratecards;
    let rate = card.rate.substr(card.rate.lastIndexOf(":") + 2).split("<br>");
    rate.forEach((info, idx) => {
      rate[idx] = info.split("/");
    });
    let print = card.print.substr(card.print.lastIndexOf(":") + 2).split("\n");
    print.forEach((info, idx) => {
      print[idx] = info.split("/");
    });
    return {
      card,
      rate, 
      print
    }
  }

  addSingleCard(ratePopUp: any, config: any, ratecards: any, setDialog: Function) {
    let evalCardDialog: string = this.evalString(
        this.buildRateObjects(ratecards[0]),
        setDialog(ratecards[0].mode));

    let notes: string = this.translations[this.billingOptions[ratecards[0].mode.toLowerCase()].cat][this.billingOptions[ratecards[0].mode.toLowerCase()].key];
    notes = notes === undefined ? "" : notes;

    let pane = KioskUi.setTabPaneText(
        ratecards[0].mode,
        0,
        evalCardDialog,
        notes);
    //
    $(".tab-content").append(pane);

    if (ratecards[0].mode.toLowerCase() === "comp") {
      $(".free-bps").hide();
      $("#rateCardTxt_comp").hide(); 
      $(".flex-item").hide();
    }
  }

  addTabs(ratePopUp: any, config: any, rateCards: any, setDialog: Function) {
    rateCards.forEach((card, idx) => {
      let tab = `<li class="${idx === 0 ? "active" : ""}">
                    <a id="${card.mode.toLowerCase()}" data-toggle="tab" href="#tab_${card.mode.toLowerCase()}">${TranslateViews.translate(card.mode.toLowerCase())}</a>
                </li>`;
      //
      $(".nav-tabs").append(tab);

      let evalCardDialog: string = this.evalString(
          this.buildRateObjects(card),
          setDialog(card.mode));
      
      let notes: string = this.translations[this.billingOptions[card.mode.toLowerCase()].cat][this.billingOptions[card.mode.toLowerCase()].key];
          notes = notes === undefined ? "" : notes;

      let pane = KioskUi.setTabPaneText(
          card.mode,
          idx,
          evalCardDialog,
          notes);
                
      $(".tab-content").append(pane);
      //
      if (card.mode.toLowerCase() === "comp") {
        $("#rateCardTxt_comp").css("visibility", "hidden");
      }
    });

    $('a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
      if (e.target.id === "comp") {
        $("#rateCardTxt_comp").css("visibility", "hidden");
      }
      e.relatedTarget; // previous active tab
    });
  }

  static setDialogText (mode): String {
      let cardDialog: string;
      switch (mode.toLowerCase()) {
          case "code":
              cardDialog = TranslateViews.translate("codeDialog");
              break;
          default:
              cardDialog = TranslateViews.translate("cardDialog");
              break;
      }
      return cardDialog;
  }

  static setTabPaneText(mode, idx, evalCardDialog, notes){
      let termsStem: string = TranslateViews.translate("terms_conditions");//12
      let termsLink: string = TranslateViews.translate("terms_link");//13
      return `
        <div id="tab_${mode.toLowerCase()}" class="tab-pane fade ${idx === 0 ? "in active" : ""}">
            <h3>${TranslateViews.translate(mode.toLowerCase())}</h3>
            <span id="rateCardTxt_${mode.toLowerCase()}">${evalCardDialog}</span>
        
            <p id="card_notes"><br>${notes}</p>

            <div id="terms_use" class="tnc">
                <button name="" id="${mode.toLowerCase() + "_" + idx}"  class="btn btn-primary btn-lg card-continue">${TranslateViews.translate("continue_btn")}</button>
                <h6 id="">${termsStem} <a class="toc-link">${termsLink}</a>.</h6>
            </div>
        </div>
      `;
  }

  addCardActions(ratePopUp: any, config: any, rateCards: any) {
      const bodyTag = $("body");
    $(".toc-link").click(function() {
        this.onToc();
      }.bind(this));

    $(".card-continue").click(function() {
      const accessObj: AccessObject = {
        RateCardID: "",   LastName: "",
        RoomNumber: "",   AccessCode: "",
        Password: "",     MacAddress: ""
      };
      let rateMode: string = $(this).attr("id").split("_")[0];
      switch (rateMode) {
        case "comp": // Complimentary
          accessObj.RateCardID = rateCards[$(this).attr("id").split("_")[1]].id;
          accessObj.MacAddress = rateCards[$(this).attr("id").split("_")[1]].macAddress;
          switch (config.complimentaryAccess.enablePassword) {
            case "true":
                bodyTag.append(ratePopUp.populateTemplate(config, rateCards[$(this).attr("id").split("_")[1]]));
              break;
            default:
              // "false"
              callClient(rateCards[$(this).attr("id").split("_")[1]].mode,accessObj);
          }
          break;
        case "card": // credit card
          accessObj.RateCardID = rateCards[$(this).attr("id").split("_")[1]].id;
          accessObj.MacAddress = rateCards[$(this).attr("id").split("_")[1]].macAddress;
          //
          onCard();
          try {
            callClient(rateCards[$(this).attr("id").split("_")[1]].mode, accessObj);
          } catch (error) {
            // no client
          }
          break;
        case "code":
        case "room":
            bodyTag.append(ratePopUp.populateTemplate(config, rateCards[$(this).attr("id").split("_")[1]]));
          break;
        default: //
      }
    });

    const onCard = () => {
      $("body").append(
        this.tocPopUp.populateTemplate(TranslateViews.translate(this.screenFields[14].id))
      );
      const dialog = $(".dialog");
      dialog.css("overflow", "hidden");
      dialog.css("margin-top", "100px");
      dialog.css("width", "350px");
      $("iframe").css("height", "445px");
    };

    const callClient = function(mode, accessObj) {
      if(Client.isAvailable)
        SessionsSrv.clientOnGoSession(mode, accessObj);
      else
        this.onGoSession(mode, accessObj);

      Client.houseKeeping();
    }.bind(this);
  }

  onToc() {
    let termsSplit: String[] = this.config.terms.split(".html");
    let tocCulture = (this.currentLang != "en-US" ? '-' + this.currentLang : '') + ".html";
    $("body").append(
      this.tocPopUp.populateTemplate(TranslateViews.translate(this.screenFields[13].id), termsSplit[0] + tocCulture)
    );
    //
      try {
        Client.houseKeeping()
      }catch(err){
        console.log("TOC trying to set housekeeping: ", err);
      }

  }

  addFreeBPS(): ActionsType {
     return  {
         id : "FBPS00000000000",
         actionType : "",
         mode : "BPS",
         title : TranslateViews.translate(this.screenFields[3].id),
         subtitle : TranslateViews.translate(this.screenFields[4].id),
         rate : "",
         print : TranslateViews.translate(this.screenFields[5].id),
         terms : TranslateViews.translate(this.screenFields[12].id) + ' <a class="toc-link">' + TranslateViews.translate(this.screenFields[13].id) + ". </a>",
      }
  }

  buildHeader(config) {
    $("#logo").attr("src", config.company.logo);
    $("#powered_by").bind("tripleclick", () => {
      $("body").append(this.popUp.populateTemplate(JSON.stringify({ MacAddress: this.macAddress })));
    });
  }

  static setBgImage(config) {
    $("body").css("backgroundImage", `url(${config.backGround})`);
  }

  public alertUser(msg: string) {
      const errorMessage:JQuery = $(".errorMessage");
    console.log("Message: ", msg);
      errorMessage.html(msg);
      errorMessage.show();
  }
}

//
const loadUI = () => {
  const kioskui: KioskUi = new KioskUi();
  kioskui.init();
};
switch (document.readyState) {
  case "complete":
    loadUI();
    break;
  default:
    document.addEventListener("DOMContentLoaded", function() {
        loadUI();
      }, false);
    break;
}
