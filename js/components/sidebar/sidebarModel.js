"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../utils/index");
var axios_1 = require("axios");
var index_2 = require("../index");
var Sidebar = (function () {
    function Sidebar() {
        this.barItems = [];
        this.checkDocument = function (docText) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, axios_1.default.get(index_1.getGrammarSpellingUrl(docText))];
                });
            });
        };
        this.searchForErrors = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                var self, suggestions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            return [4, Promise.all([
                                    self.checkDocument(text)
                                ]).catch(function (error) {
                                    console.log("Error: ", error);
                                })];
                        case 1:
                            suggestions = (_a.sent())[0];
                            return [2, suggestions.data.errors];
                    }
                });
            });
        };
        index_1.ReadFile.loadFile();
        var self = this;
        index_1.EventUtility.addListener(index_1.EventUtility.FILE_LOADED, function (ele) {
            index_1.SharedUtility.setStatement = ele.details.results;
            $('.js-filename').text(ele.details.filename);
            self.sendImportedText();
        });
        index_1.EventUtility.addListener(index_1.EventUtility.SET_SUGGESTION, function (evt) {
            console.log('Set Suggestions: ', evt);
            var _a = evt.details, errorText = _a.errorText, suggestion = _a.suggestion;
            var suggestions = self.currentSuggestions.filter(function (item) {
                if (item.bad !== errorText)
                    return item;
            });
            console.table(suggestions);
            self.createSuggestions(suggestions);
            self.currentSuggestions = suggestions;
        });
    }
    Sidebar.prototype.sendImportedText = function () {
        var _this = this;
        var textField = $('.js-text-field');
        this.searchForErrors(index_1.SharedUtility.getStatement).then(function (data) {
            data.map(function (item) {
                item.used = false;
            });
            index_1.SharedUtility.setSuggestions = _this.currentSuggestions = data;
            _this.createSuggestions(data);
            index_1.EventUtility.announceEvt(index_1.EventUtility.DOC_PARSED);
        });
    };
    Sidebar.prototype.createSuggestions = function (data) {
        var _this = this;
        var errorDiv = $('.js-errors');
        errorDiv.empty();
        data.map(function (item, idx) {
            var htmlItem = $(require("./barItem/item.html!text"));
            errorDiv.append(htmlItem);
            var id = "item_" + item.id + "_" + item.offset;
            $(htmlItem).attr('id', id);
            var title = $(htmlItem).find('.title');
            title.html(item.bad);
            _this.barItems[idx] = new index_2.Item(item.better);
            _this.barItems[idx].init("#" + id, item.bad);
            var ignoreBtn = htmlItem.find('.js-ignore-suggestion');
            ignoreBtn.click(function () {
                index_1.EventUtility.announceEvt(index_1.EventUtility.SET_SUGGESTION, {
                    errorText: $(this).text().trim(), suggestion: $(this).text().trim()
                });
            });
        });
    };
    return Sidebar;
}());
exports.Sidebar = Sidebar;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/components/sidebar/sidebarModel.js.map