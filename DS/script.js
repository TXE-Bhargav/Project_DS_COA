// JavaScript code for linked list operations
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
        this.maxSize = 27; // Maximum size limit
    }

    insertNode(data) {
        if (!data) {
            alert("Please enter a value.");
            return;
        }
        if (this.size >= this.maxSize) {
            alert("Maximum size reached");
            return;
        }
        let newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        this.display();
    }

    removeNode(data) {
        if (!this.head) {
            return;
        }
        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            this.display();
            return;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.data === data) {
                current.next = current.next.next;
                this.size--;
                this.display();
                return;
            }
            current = current.next;
        }
        alert("Node with value " + data + " does not exist.");
    }

    updateNode(index, newData) {
        if (isNaN(index) || index < 0 || !newData) {
            alert("Please provide valid index and data.");
            return;
        }
        let newNode = new Node(newData);
        if (index === 0) {
            newNode.next = this.head.next;
            this.head = newNode;
        } else {
            let current = this.head;
            let count = 0;
            while (current && count < index - 1) {
                current = current.next;
                count++;
            }
            if (current) {
                newNode.next = current.next ? current.next.next : null;
                current.next = newNode;
            }
        }
        this.display();
    }

    display() {
        let displayList = document.getElementById('container');
        displayList.innerHTML = '';
        let current = this.head;
        while (current) {
            let nodeDiv = document.createElement('div');
            nodeDiv.className = 'node';
            let dataDiv = document.createElement('div');
            dataDiv.className = 'data';
            dataDiv.textContent = current.data;
            let arrowDiv = document.createElement('div');
            arrowDiv.className = 'arrow';
            arrowDiv.textContent = '➜';
            nodeDiv.appendChild(dataDiv);
            nodeDiv.appendChild(arrowDiv);
            displayList.appendChild(nodeDiv);
            current = current.next;
        }
        // If maximum size reached, display "NULL" at the end
        if (this.size >= this.maxSize) {
            let nullDiv = document.createElement('div');
            nullDiv.className = 'node';
            let nullDataDiv = document.createElement('div');
            nullDataDiv.className = 'data';
            nullDataDiv.textContent = 'NULL';
            nullDiv.appendChild(nullDataDiv);
            displayList.appendChild(nullDiv);
        }
    }
}

let linkedList = new LinkedList();

document.getElementById('insertButton').addEventListener('click', function () {
    let nodeValue = document.getElementById('nodeValue').value;
    linkedList.insertNode(nodeValue);
});

document.getElementById('removeButton').addEventListener('click', function () {
    let nodeValue = document.getElementById('nodeValue').value;
    linkedList.removeNode(nodeValue);
});

document.getElementById('updateButton').addEventListener('click', function () {
    let index = parseInt(prompt('Enter index of the node to update:'));
    let newData = prompt('Enter new data:');
    linkedList.updateNode(index, newData);
});