import {HashTable} from "./hashTable";

class SharedUtil {
    private hashTable: HashTable;
    private _statementObj;
    private _suggestions: {used:boolean, id:string, offset: number, length: number, bad: string, better: string[]} [] = [];
    private _suggestionsHash;
    constructor(){

    }
    get getStatement(){
        return this._statementObj;
    }
    set setStatement(statement: String){
        let statementArr: string[] = statement.split(" ");
        this.hashTable = new HashTable(statementArr.length);
        this.setUpHashTable(statementArr);
        this._statementObj = statement
    }
    get getSuggestion(){
        return this._suggestions;
    }
    set setSuggestions(suggestions){
        this._suggestions = suggestions;
    }
    get suggestionsHash(){
        return this._suggestionsHash;
    }
    set suggestionsHash(hash) {
        this._suggestionsHash = hash;
    }
    // Fast look up by word but Not sure for a phrase....
    setUpHashTable(values){
        values.forEach( value => {
            this.hashTable.insert(value, value);
        });
    }
}

export const SharedUtility: SharedUtil = new SharedUtil();