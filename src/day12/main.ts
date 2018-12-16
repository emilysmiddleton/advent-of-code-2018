export function part1(lines: string[]): any {
    return repeat(lines, 20);
}

function repeat(lines: string[], repeat: number) {
    const input = lines[0]
        .replace('initial state: ', '')
    const notes = lines.slice(2)
        .filter(line => line.indexOf(' => #') >= 0)
        .map(line => line.substring(0, 5));

    let next = '.'.repeat(repeat) + input + '.'.repeat(repeat);
    for (let i = 0; i < repeat; i ++) {
        next = getNext(next, notes);
    }

    return sum(next, repeat);
}

function sum(state: string, repeat: number) {
    return Array.from(state)
        .map((value, index) => value === '#' ? index - repeat : 0)
        .reduce((a, b) => a + b, 0);
}

function getNext(previous: string, notes: string[]) {
    let next = '..';
    for (let i = 0; i < previous.length; i++) {
        if (notes.lastIndexOf(previous.substring(i, i + 5)) >= 0) {
            next += '#';
        }
        else {
            next += '.';
        }
    }
    return next;
}

export function part2(lines: string[]): any {
    const after999 = repeat(lines, 999);
    const after1000 = repeat(lines, 1000);
    const gradient = after1000 - after999;
    const offset = after1000 - (gradient * 1000);
    return 50000000000 * gradient + offset;
}
