type Rectangle = {
    id: number,
    left: number,
    top: number,
    width: number,
    height: number
}

const INPUT_PATTERN: RegExp = new RegExp('#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)');

function parseLine(line: string): Rectangle {
    const matched: RegExpExecArray = INPUT_PATTERN.exec(line);
    return {
        id: parseInt(matched[1]),
        left: parseInt(matched[2]),
        top: parseInt(matched[3]),
        width: parseInt(matched[4]),
        height: parseInt(matched[5])
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
    let overlaps: number = 0;
    for (const count of counts.values()) {
        if (count > 1) { overlaps++; }
    }
    return overlaps;
}

export function part2(lines: string[]): any {
    const rectangles: Rectangle[] = lines.map(parseLine);
    const counts: Map<string, number> = toCounts(rectangles);
    for (const rectangle of rectangles) {
        if (!overlaps(counts, rectangle)) {
            return rectangle.id;
        }
    }
    return 0;
}

function overlaps(counts: Map<string, number>, rectangle: Rectangle) {
    for (const coordinate of getCoordinates(rectangle)) {
        if (counts.get(coordinate) > 1) {
            return true;
        }
    }
    return false;
}
