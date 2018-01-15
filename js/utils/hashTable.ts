import { HashNode } from "./hashNode";

export class HashTable {
    private buckets: any;
    private numBuckets: number = 0;

    constructor(size) {
        this.buckets = Array(size);
        this.numBuckets = this.buckets.length;
    }

    private hash(key) {
        let total: number = 0;
        for (let i = 0; i < key.length; i++) {
            total += key.charCodeAt(i);
        }
        let bucket: number = total % this.numBuckets;
        return bucket;
    }

    insert(key, value) {
        let index: any = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = new HashNode(key, value);
        } else if (this.buckets[index].key === key) {
            this.buckets[index].value = value;
        } else {
            let currentNode = this.buckets[index];
            while (currentNode.next) {
                if (currentNode.next.key === key) {
                    currentNode.next.value = value;
                    return;
                }
                currentNode = currentNode.next;
            }
            currentNode.next = new HashNode(key, value);
        }
    }

    getValue(key) {
        var index = this.hash(key);
        if (!this.buckets[index]) return null;
        else {
            var currentNode = this.buckets[index];
            while (currentNode) {
                if (currentNode.key === key) return currentNode.value;
                currentNode = currentNode.next;
            }
            return null;
        }
    }

    retrieveAll() {
        var allNodes = [];
        for (var i = 0; i < this.numBuckets; i++) {
            var currentNode = this.buckets[i];
            while (currentNode) {
                allNodes.push(currentNode);
                currentNode = currentNode.next;
            }
        }
        return allNodes;
    }
}
