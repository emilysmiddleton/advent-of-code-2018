function parseLine(line: string): number {
    const sign: string = line.substring(0, 1);
    let value: number = parseInt(line.substring(1, line.length), 10);
    if (sign === '-') {
        value = value * -1;
    }
    return value;
}

export function part1(lines: string[]): any {
    const numbers: number[] = lines.map(parseLine);
    return numbers.reduce((a, b) => a + b, 0);
}

export function part2(lines: string[]): any {
    const numbers: number[] = lines.map(parseLine);
    const seen: number[] = [0];
    let total = 0;
    while (true) {
        for (const input of numbers) {
            total += input;
            if (seen.indexOf(total) >= 0) {
                return total;
            }
            seen.push(total);
        }
    }
    return 0;
}
