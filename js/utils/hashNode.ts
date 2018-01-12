export class HashNode {
    private key: String = "";
    private value
    private next;

    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next || null;
    }
}