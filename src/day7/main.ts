type Node = {
    id: string,
    prereqs: string[];

}

type Progress = {
    id: string,
    time: number
}

export function part1(lines: string[]): any {
    const nodes = new Map<string, Node>();
    lines.forEach(line => parse(nodes, line));
    let order = '';
    while (nodes.size > 0) {
        const next = getNextActionable(nodes);
        order += next;
        removeActioned(nodes, next);
    }
    return order;
}

export function part2(lines: string[]): any {
    const nodes = new Map<string, Node>();
    lines.forEach(line => parse(nodes, line));
    const size = nodes.size;

    const workers = size === 6 ? 2 : 5;
    const duration = size === 6 ? 0 : 60;


    let order = '';
    const inProgress: Progress[] = [];
    for (let i = 0; i < workers; i++) {
        inProgress[i] = toProgress(getNextActionable(nodes), duration);
    }

    let time = 0;
    while (order.length < size) {
        for (let i = 0; i < workers; i++) {
            if (inProgress[i]) {
                inProgress[i].time = inProgress[i].time - 1;
                if (inProgress[i].time === 0) {
                    order += inProgress[i].id;
                    removeActioned(nodes, inProgress[i].id);
                    inProgress[i] = toProgress(getNextActionable(nodes), duration);
                }
            }
            else {
                inProgress[i] = toProgress(getNextActionable(nodes), duration);
            }
        }
        time++;
    }
    return time;
}

const ALPHABET = Array.from('abcdefghijklmnopqrstuvwxyz');
function toProgress(id: string, time: number): Progress {
    if (id === undefined) {
        return undefined;
    }
    return {
        id: id,
        time: ALPHABET.lastIndexOf(id.toLowerCase()) + 1 + time
    };
}

function getNextActionable(nodes: Map<string, Node>): string {
    if (nodes.size === 0) {
        return undefined;
    }
    const actionable = Array.from(nodes.values())
        .filter(value => value.prereqs.length === 0)
        .map(node => node.id)
        .sort();
    nodes.delete(actionable[0]);
    return actionable[0];
}

function removeActioned(nodes: Map<string, Node>, actioned: string) {
    for (const node of nodes.values()) {
        node.prereqs = node.prereqs.filter(id => id !== actioned);
    }
}

function parse(nodes: Map<string, Node>, line: string) {
    const requires = line.substring(5, 6);
    const id = line.substring(36, 37);
    if (!nodes.has(id)) {
        nodes.set(id, { id: id, prereqs: [] });
    }
    if (!nodes.has(requires)) {
        nodes.set(requires, { id: requires, prereqs: [] });
    }
    nodes.get(id).prereqs.push(requires);
}
