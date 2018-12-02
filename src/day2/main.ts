function parseLine(line: string): Map<string, number> {
    const map = new Map<string, number>();
    for (const char of line.trim()) {
        let count = map.get(char);
        count = count ? count + 1 : 1;
        map.set(char, count);
    }
    return map;
}

function getFrequencies(map: Map<string, number>) : Set<number> {
    const set = new Set<number>();
    for (const frequency of map.values()) {
        set.add(frequency);
    }
    return set;
}

export function part1(lines: string[]): any {
    const counts: Map<string, number>[] = lines.map(parseLine);
    const frequencies: Set<number>[] = counts.map(getFrequencies);
    let twos: number = 0;
    let threes: number = 0;
    for (const set of frequencies) {
        if (set.has(2)) { twos++; }
        if (set.has(3)) { threes++; }
    }
    return twos * threes;
}

export function part2(lines: string[]): any {
    for (let i = 0; i < lines[0].length; i++) {
        for (const lineA of lines) {
            const maskedA: string = mask(lineA, i);
            for (const lineB of lines) {
                const maskedB: string = mask(lineB, i);
                if (lineA !== lineB && maskedA === maskedB) {
                    return maskedA;
                }
            }
        }
    }
    return '';
}

function mask(line: string, i: number) {
    return line.substring(0, i) + line.substring(i + 1, line.length);
}
