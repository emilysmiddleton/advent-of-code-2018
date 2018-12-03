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

function toCounts(rectangles: Rectangle[]): Map<string, number> {
    const map = new Map<string, number>();
    for (const rectangle of rectangles) {
        for (const coordinate of getCoordinates(rectangle)) {
            let count = map.get(coordinate);
            count = count ? count + 1 : 1;
            map.set(coordinate, count);
        }
    }
    return map;
}

export function part1(lines: string[]): any {
    const rectangles: Rectangle[] = lines.map(parseLine);
    const counts: Map<string, number> = toCounts(rectangles);
    console.log(counts);
    let overlaps: number = 0;
    for (const count of counts.values()) {
        if (count > 1) { overlaps++; }
    }
    return overlaps;
}

export function part2(_input: string[]): any {
    return 0;
}
