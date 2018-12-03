type Rectangle = {
    left: number,
    top: number,
    width: number,
    height: number
}

const INPUT_PATTERN: RegExp = new RegExp('#[0-9]+ @ (0-9)+,(0-9)+: (0-9)+x(0-9)+');

function parseLine(line: string): Rectangle {
    const matched: RegExpExecArray = INPUT_PATTERN.exec(line);
    return {
        left: matched[1],
        top: matched[2],
        width: matched[3],
        height: matched[4]
    }
}

export function part1(lines: string[]): any {
    const rectangles: Rectangle[] = lines.map(parseLine);
    return 0;
}

export function part2(_input: string[]): any {
    return 0;
}
