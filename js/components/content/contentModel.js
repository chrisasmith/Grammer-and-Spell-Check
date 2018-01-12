"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../utils/index");
var Content = (function () {
    function Content() {
        index_1.EventUtility.addListener('DOC_LOADED', function (ele) {
            console.log('Got Event: ', ele);
            $('.js-statement').empty().text(index_1.SharedUtility.getStatement);
        });
    }
    return Content;
}());
exports.Content = Content;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/components/content/contentModel.js.map