type Rectangle = {
    left: number,
    top: number,
    width: number,
    height: number
}

const INPUT_PATTERN: RegExp = new RegExp('#[0-9]+ @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)');

function parseLine(line: string): Rectangle {
    const matched: RegExpExecArray = INPUT_PATTERN.exec(line);
    return {
        left: parseInt(matched[1]),
        top: parseInt(matched[2]),
        width: parseInt(matched[3]),
        height: parseInt(matched[4])
    }
}

function getCoordinates(rectangle: Rectangle): string[] {
    const coordinates = [];
    for (let i = 0; i < rectangle.width; i++) {
        for (let j = 0; j < rectangle.height; j++) {
            const x: number = rectangle.left + i;
            const y: number =  rectangle.top + j;
            coordinates.push(`${x},${y}`);
        }
    }
    return coordinates;
}

export function part1(lines: string[]): any {
    const rectangles: Rectangle[] = lines.map(parseLine);

    const all: Set<string> = new Set<string>();
    const overlap: Set<string> = new Set<string>();

    for (const rectangle of rectangles) {
        const coordinates = getCoordinates(rectangle);
        for (const coordinate of coordinates) {
            if (all.has(coordinate)) {
                overlap.add(coordinate);
            }
            all.add(coordinate);
        }
    }
    return overlap.size;
}

export function part2(_input: string[]): any {
    return 0;
}
