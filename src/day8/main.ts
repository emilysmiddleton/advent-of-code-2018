class Node {

    parent: Node;
    index: number;
    childCount: number;
    metadataCount: number;
    metadata: number[] = [];
    children: Node[] = [];

    constructor(parent: Node, index: number, childCount: number, metadataCount: number) {
        this.parent = parent;
        this.index = index;
        this.childCount = childCount;
        this.metadataCount = metadataCount;
    }

    getValue(): number {
        if (this.childCount === 0) {
            return sum(this.metadata);
        }
        let value = 0;
        for (const index of this.metadata) {
            if (index <= this.childCount) {
                value += this.children[index - 1].getValue();
            }
        }
        return value;
    }


}

export function part1(lines: string[]): any {
    let inputs: number[] = lines[0].split(' ').map(s => parseInt(s));
    const root: Node = createTree(inputs);
    let total = 0;
    depthFirst(root, n => total += sum(n.metadata));
    return total;
}

function sum(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
}

function depthFirst(node: Node, callback: (n: Node) => void): void {
    callback(node);
    node.children.forEach(n => depthFirst(n, callback));
}

function createTree(inputs: number[]): Node {
    const root: Node = new Node(undefined, 0, 1, 0);
    parseTree(root, 0, inputs);
    return root.children[0];
}

export function parseTree(parent: Node, index: number, inputs: number[]): void {
    if (index >= inputs.length) {
        return;
    }
    if (parent.children.length === parent.childCount) {
        parent.metadata = inputs.slice(index, index + parent.metadataCount);
        parseTree(parent.parent, index + parent.metadataCount, inputs);
    }
    else {
        const node: Node = new Node(parent, index, inputs[index], inputs[index + 1]);
        parent.children.push(node);
        parseTree(node, index + 2, inputs);
    }
}

export function part2(lines: string[]): any {
    let inputs: number[] = lines[0].split(' ').map(s => parseInt(s));
    const root: Node = createTree(inputs);
    return root.getValue();
}
