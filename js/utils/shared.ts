import {HashTable} from "./hashTable";

class SharedUtil {
    private hashTable: HashTable;
    private _statementObj;//: {}[];
    private _suggestions: {id:string, offset: number, length: number, bad: string, better: string[]} [] = [];
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
    get getSuggenstion(){
        return this._suggestions;
    }
    set setSuggestions(suggestions){
        this._suggestions = suggestions;
    }
    // Fast look up by word but Not sure for a phrase....
    setUpHashTable(values){
        values.forEach( value => {
            this.hashTable.insert(value, value);
        });
        console.log(this.hashTable);
    }
}

export const SharedUtility: SharedUtil = new SharedUtil();