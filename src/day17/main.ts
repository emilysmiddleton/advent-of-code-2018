import { Coord, down, Grid, left, right } from '../day13/grid';

type Ground = Grid<string>;
const REGEX = new RegExp('([xy])=(\\d+), [xy]=(\\d+)\\.\\.(\\d+)');

function parse(line: string): Coord[] {
    const coords = [];
    const match = REGEX.exec(line);
    if (match) {
        const index = parseInt(match[2]);
        const from = parseInt(match[3]);
        const to = parseInt(match[4]);
        for (let i = from; i <= to; i++) {
            coords.push(match[1] === 'x' ? [index, i] : [i, index]);
        }
    }
    return coords;
}

function createGrid(lines: string[]): Ground {
    const coords: Coord[] = [];
    lines.forEach(line => coords.push(... parse(line)));
    const width = Math.max(...coords.map(c => c[0])) + 10;
    const height = Math.max(...coords.map(c => c[1])) + 1;
    const squares: string[][] = [];
    for (let y = 0; y < height; y++) {
        squares.push(Array.from('.'.repeat(width)));
    }
    const grid = new Grid<string>(squares);
    for (const coord of coords) {
        grid.set(coord, '#');
    }
    grid.set([500, 0], '+');
    return grid;
}

export function fillFromPump(ground: Ground): void {
    const pump = ground.getAllMatching(s => s === '+')[0];
    ground.set(down(pump), '|');
    let changed = true;
    while (changed) {
        changed = fill(ground);
    }
}

function fill(ground: Ground): boolean {
    let changed = false;
    for (const coord of ground.getAllMatching(s => s === '|')) {
        changed = changed || fillFromBottom(ground, down(coord));
        if (isSolid(ground, down(coord))) {
            changed = changed || fillFromBottom(ground, left(coord));
            changed = changed || fillFromBottom(ground, right(coord));
        }
    }
    return changed;
}

function fillFromBottom(ground: Ground, coord: Coord): boolean{
    if (isSand(ground, coord)) {
        let next = coord;
        while(isSand(ground, next)) {
            next = down(next);
        }
        for (let y = next[1] - 1; y >= coord[1]; y--) {
            setWater(ground, [coord[0], y]);
        }
        return true;
    }
    return false;
}

function setWater(ground: Ground, coord: Coord): void {
    const leftWall = getWall(ground, coord, left);
    const rightWall = getWall(ground, coord, right);
    if (leftWall && rightWall) {
        for (let x = leftWall[0] + 1; x < rightWall[0]; x++) {
            ground.set([x, coord[1]], '~');
        }
    } else {
        ground.set(coord, '|');
    }
}

const isSolid = (ground: Ground, coord: Coord) => ground.get(coord) === '#' || ground.get(coord) === '~';
const isSand = (ground: Ground, coord: Coord) => ground.get(coord) === '.';

function getWall(ground: Ground, last: Coord, func: (coord: Coord) => Coord): Coord {
    let next = last;
    while (ground.get(next) !== '#' && ground.withinGrid(next)) {
        if (ground.get(down(next)) === '.') {
            return;
        }
        next = func(next);
    }
    return ground.withinGrid(next) ? next : undefined;
}

export function part1(lines: string[]): any {
    const ground = createGrid(lines);
    const lower = Math.min(... ground.getAllMatching(s => s === '#').map(c => c[1]));
    fillFromPump(ground);
    console.log(ground.toString(s => s));
    return ground.getAllMatching(s => s === '~' || s === '|').filter(c=> c[1] >= lower).length;
}

export function part2(lines: string[]): any {
    const ground = createGrid(lines);
    fillFromPump(ground);
    console.log(ground.toString(s => s));
    return ground.getAllMatching(s => s === '~').length;
}
