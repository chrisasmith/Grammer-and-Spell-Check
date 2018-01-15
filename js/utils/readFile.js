"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
var ReadFile = (function () {
    function ReadFile() {
    }
    ReadFile.loadFile = function () {
        var fileInput = document.querySelector('.inputfile');
        fileInput.addEventListener('change', function (e) {
            var file = this.files[0];
            if (this.files[0].type === 'text/plain') {
                console.log('File Results: ', this.files[0]);
                var reader_1 = new FileReader();
                reader_1.onload = function (e) {
                    console.log('File Results: ', reader_1.result);
                    events_1.EventUtility.announceEvt(events_1.EventUtility.FILE_LOADED, {
                        filename: file.name,
                        results: reader_1.result
                    });
                };
                reader_1.readAsText(this.files[0]);
            }
            else {
            }
        }, false);
    };
    return ReadFile;
}());
exports.ReadFile = ReadFile;
//# sourceMappingURL=/Users/chrissmith/Desktop/G&S/utils/readFile.js.map