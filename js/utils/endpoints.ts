import { GRAMMAR_API } from "../constants/constants";
//import "utf8";
const utf8Encoding = (text) => encodeURI(text);

export const getGrammarSpellingUrl = fieldText => {
    console.log("Search String: ", fieldText);
    const apiUrl = `https://api.textgears.com/check.php?key=${GRAMMAR_API}&text=${utf8Encoding( fieldText )}`;
    console.log("apiUrl: ", apiUrl);
    return apiUrl;
};
