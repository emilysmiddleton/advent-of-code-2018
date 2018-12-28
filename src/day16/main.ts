type Register = number[];
type Operation = (r: Register, a: number, b: number, c: number) => void;
type Sample = {
    before: Register,
    op: number,
    a: number,
    b: number,
    c: number,
    after: Register
}

function createOps(): Map<string, Operation> {
    const ops = new Map<string, Operation>();
    ops.set("addr", (r, a, b, c) => r[c] = r[a] + r[b]);
    ops.set("addi", (r, a, b, c) => r[c] = r[a] + b);
    ops.set("mulr", (r, a, b, c) => r[c] = r[a] * r[b]);
    ops.set("muli", (r, a, b, c) => r[c] = r[a] * b);
    ops.set("banr", (r, a, b, c) => r[c] = r[a] & r[b]);
    ops.set("bani", (r, a, b, c) => r[c] = r[a] & b);
    ops.set("borr", (r, a, b, c) => r[c] = r[a] | r[b]);
    ops.set("bori", (r, a, b, c) => r[c] = r[a] | b);
    ops.set("setr", (r, a, _b, c) => r[c] = r[a]);
    ops.set("seti", (r, a, _b, c) => r[c] = a);
    ops.set("gtir", (r, a, b, c) => r[c] = a > r[b] ? 1 : 0);
    ops.set("gtri", (r, a, b, c) => r[c] = r[a] > b ? 1 : 0);
    ops.set("gtrr", (r, a, b, c) => r[c] = r[a] > r[b] ? 1 : 0);
    ops.set("eqir", (r, a, b, c) => r[c] = a === r[b] ? 1 : 0);
    ops.set("eqri", (r, a, b, c) => r[c] = r[a] === b ? 1 : 0);
    ops.set("eqrr", (r, a, b, c) => r[c] = r[a] === r[b] ? 1 : 0);
    return ops;
}

function getMatches(ops: Map<string, Operation>, sample: Sample, possibles: string[]): string[] {
    const matches = [];
    for (const op of possibles) {
        const newReg = sample.before.slice();
        ops.get(op)(newReg, sample.a, sample.b, sample.c);
        if (JSON.stringify(newReg) === JSON.stringify(sample.after)) {
            matches.push(op);
        }
    }
    return matches;
}

function getSamples(lines: string[]): Sample[] {
    const samples = [];
    for (let i = 0; i < lines.length; i += 4) {
        if (lines[i].includes('Before')) {
            const calc = lines[i + 1].split(' ').map(s => parseInt(s));
            samples.push({
                before: lines[i].substring(9, lines[i].length - 1).split(', ').map(s => parseInt(s)),
                op: calc[0],
                a: calc[1],
                b: calc[2],
                c: calc[3],
                after: lines[i + 2].substring(9, lines[i + 2].length - 1).split(', ').map(s => parseInt(s)),
            });
        }
    }
    return samples;
}

export function part1(lines: string[]): any {
    const ops = createOps();
    const samples = getSamples(lines);
    let count = 0;
    for (const sample of samples) {
        const matches = getMatches(ops, sample, [...ops.keys()]);
        if (matches.length >= 3) {
            count++;
        }
    }
    return count;
}

export function part2(lines: string[]): any {
    const ops = createOps();
    const samples = getSamples(lines);

    const mapping = getMapping(ops, samples);
    const register = [0, 0, 0, 0];
    for (let i = samples.length * 4 + 2; i < lines.length; i++) {
        const inputs = lines[i].split(' ');
        const op = ops.get(mapping.get(parseInt(inputs[0])));
        op(register, parseInt(inputs[1]), parseInt(inputs[2]), parseInt(inputs[3]));
    }
    return register[0];
}

function getMapping(ops: Map<string, Operation>, samples: Sample[]): Map<number, string> {
    const unmapped = new Map<number, string[]>();
    for (const sample of samples) {
        const possibles = unmapped.has(sample.op) ? unmapped.get(sample.op) : [...ops.keys()];
        const matches = getMatches(ops, sample, possibles);
        unmapped.set(sample.op, matches);
    }
    const mapping = new Map<number, string>();
    while (mapping.size < unmapped.size) {
        addKnown(mapping, unmapped);
    }
    return mapping;
}

function addKnown(mapping: Map<number, string>, unmapped: Map<number, string[]>) {
    for (const op of unmapped.keys()) {
        const options = unmapped.get(op);
        if (options.length === 1) {
            mapping.set(op, options[0]);
        }
    }
    removeAll(unmapped, [... mapping.values()]);
}
function removeAll(map: Map<number, string[]>, values: string[]) {
    for (const key of map.keys()) {
        map.set(key, map.get(key).filter(v => values.indexOf(v) < 0));
    }
}


