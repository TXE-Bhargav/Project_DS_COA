// JavaScript code for linked list operations with animations
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
        this.display('insert', newNode);
    }

    removeNode(data) {
        if (!this.head) {
            alert("The Linked List is Empty");
            return;
        }
        if (this.head.data === data) {
            this.display('remove', this.head, null);
            this.head = this.head.next;
            this.size--;
            return;
        }
        let current = this.head;
        let prev = null;
        while (current) {
            if (current.data === data) {
                this.display('remove', current, prev);
                if (prev) {
                    prev.next = current.next;
                }
                this.size--;
                return;
            }
            prev = current;
            current = current.next;
        }
        alert("Node with value " + data + " does not exist.");
    }

    updateNode(index, newData) {
        if (isNaN(index) || index < 0 || !newData) {
            alert("Please provide valid index and data.");
            return;
        }
        let current = this.head;
        let count = 0;
        while (current && count < index) {
            current = current.next;
            count++;
        }
        if (current) {
            current.data = newData;
            this.display('update', current);
        } else {
            alert("Node with index " + index + " does not exist.");
        }
    }

    display(action, node, prevNode) {
        let displayList = document.getElementById('container');
        displayList.innerHTML = '';
        let current = this.head;
        while (current) {
            let nodeDiv = document.createElement('div');
            nodeDiv.className = 'node';
            let dataDiv = document.createElement('div');
            dataDiv.className = 'data';
            dataDiv.textContent = current.data;

            if (action === 'insert' && current === node) {
                nodeDiv.classList.add('fade-in');
            }

            if (action === 'update' && current === node) {
                dataDiv.classList.add('scale-up');
                dataDiv.classList.add('flip-value');
            }

            nodeDiv.appendChild(dataDiv);

            if (current.next || this.size >= this.maxSize) {
                let arrowDiv = document.createElement('div');
                arrowDiv.className = 'arrow';
                arrowDiv.textContent = '➜';
                nodeDiv.appendChild(arrowDiv);
            }

            displayList.appendChild(nodeDiv);
            current = current.next;
        }

        if (this.size >= this.maxSize) {
            let nullDiv = document.createElement('div');
            nullDiv.className = 'node';
            let nullDataDiv = document.createElement('div');
            nullDataDiv.className = 'data';
            nullDataDiv.textContent = 'NULL';
            nullDiv.appendChild(nullDataDiv);
            displayList.appendChild(nullDiv);
        }

        if (action === 'remove' && node) {
            this.removeWithAnimation(node);
        }
    }

    removeWithAnimation(node) {
        let displayList = document.getElementById('container');
        let nodeToRemove = [...displayList.querySelectorAll('.node')].find(n => n.querySelector('.data').textContent == node.data);

        if (nodeToRemove) {
            nodeToRemove.classList.add('fade-out');
            setTimeout(() => {
                nodeToRemove.remove();
            }, 500);
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
