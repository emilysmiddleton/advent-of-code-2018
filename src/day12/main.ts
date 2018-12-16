export function part1(lines: string[]): any {
    return sum(lines, 20);
}

function sum(lines: string[], repeat: number) {
    const input = lines[0]
        .replace('initial state: ', '')
    const notes = lines.slice(2)
        .filter(line => line.indexOf(' => #') >= 0)
        .map(line => line.substring(0, 5));
    console.log(input);

    let next = '..........' + input + '..........';
    for (let i = 0; i < repeat; i ++) {
        next = getNext(next, notes);
        console.log(next);
    }

    return Array.from(next)
        .map((value, index) => value === '#' ? -10 + index : 0)
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

export function part2(_input: string[]): any {
    return 0;
}
