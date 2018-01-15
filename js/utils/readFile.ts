import { EventUtility } from "./events";

export class ReadFile {
    //private fileDisplayArea = document.getElementById('fileDisplayArea');

    static loadFile(){
        const  fileInput = document.querySelector('.inputfile');
        fileInput.addEventListener('change', function(e) {
            let file = this.files[0];
            if (this.files[0].type === 'text/plain') {
                console.log('File Results: ', this.files[0]);
                let reader = new FileReader();
                reader.onload = function(e) {
                    console.log('File Results: ', reader.result);
                    EventUtility.announceEvt(EventUtility.FILE_LOADED, {
                            filename: file.name,
                            results: reader.result
                        });
                };
                reader.readAsText(this.files[0]);
            } else {
                //fileDisplayArea.innerText = "File not supported!"
            }
        }, false);
    }



}