function parseLine(line: string): Map<string, number> {
    const map = new Map<string, number>();
    for (const char of line.trim()) {
        let count = map.get(char);
        count = count ? count + 1 : 1;
        map.set(char, count);
    }
    return map;
}

function toValues(map: Map<string, number>) : Set<number> {
    return new Set<number>(map.values());
}

export function part1(lines: string[]): any {
    const counts: Set<number>[] = lines.map(parseLine).map(toValues);
    const twos: number = counts.filter((value) => value.has(2)).length;
    const threes:number  = counts.filter((value) => value.has(3)).length;
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
