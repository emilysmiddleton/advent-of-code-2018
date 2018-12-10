type Point = {
    px: number,
    py: number,
    vx: number,
    vy: number
}

const INPUT_PATTERN: RegExp = new RegExp('position=< ?(-?\\d+),  ?(-?\\d+)> velocity=< ?(-?\\d+),  ?(-?\\d+)>');

function format(x: number, y: number): string {
    return `${x},${y}`;
}

function getPointsSet(points: Point[]): Set<string> {
    const strings: string[] = points.map(p => format(p.px, p.py));
    return new Set<string>(strings);
}

function next(point: Point): Point {
    return {
        px: point.px + point.vx,
        py: point.py + point.vy,
        vx: point.vx,
        vy: point.vy
    }
}

function parseLine(line: string): Point {
    const matched: RegExpExecArray = INPUT_PATTERN.exec(line);
    return {
        px: parseInt(matched[1]),
        py: parseInt(matched[2]),
        vx: parseInt(matched[3]),
        vy: parseInt(matched[4])
    }
}

function print(points: Point[]): string {
    const xs: number[] = points.map(p => p.px);
    const ys: number[] = points.map(p => p.py);

    const pointsSet: Set<string> = getPointsSet(points);

    let message: string = '';
    for (let y = Math.min(...ys); y <= Math.max(...ys); y++) {
        let line: string = '';
        for (let x = Math.min(...xs); x <= Math.max(...xs); x++) {
            line += pointsSet.has(format(x, y)) ? '#' : '.';
        }
        message += line + '\n';
    }
    return message;
}

export function part1(lines: string[]): any {
    return getMessage(lines).message;
}

export function part2(lines: string[]): any {
    return getMessage(lines).time;
}

export function getMessage(lines: string[]): { message: string, time: number} {
    const letterSize : number = lines.length < 40 ? 7 : 9;
    let points: Point[] = lines.map(parseLine);

    let time: number = 0;
    while (true) {
        const ys: number[] = points.map(p => p.py);
        const height: number = Math.max(... ys) - Math.min(... ys);
        if (height === letterSize) {
            return { message: print(points), time: time};
        }
        points = points.map(next);
        time++;
    }
    return undefined;
}
