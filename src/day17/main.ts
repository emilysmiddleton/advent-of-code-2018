import { Coord, down, Grid, left, right, up } from '../day13/grid';

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
    const width = Math.max(...coords.map(c => c[0])) + 1;
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

function next(ground: Ground, last: Coord): Coord[] {
    const below = down(last);
    if (isSand(ground, below)) {
        ground.set(below, '|');
        return [below];
    }
    const leftWall = getWall(ground, last, left);
    const rightWall = getWall(ground, last, right);

    if (leftWall && rightWall) {
        for (let i = leftWall[0] + 1; i < rightWall[0]; i++) {
            ground.set([i, last[1]], '~');
        }
        return [up(last)];
    }


    if (leftWall) {
        for (let i = leftWall[0] + 1; i <= last[0]; i++) {
            ground.set([i, last[1]], '|');
        }
        let next = last;
        while (isClay(ground, down(next)) || isWater(ground, down(next))) {
            next = right(next);
            ground.set(next, '|');
        }
        return [next];
    }

    if (rightWall) {
        for (let i = last[0]; i < rightWall[0]; i++) {
            ground.set([i, last[1]], '|');
        }
        let next = last;
        while (isClay(ground, down(next)) || isWater(ground, down(next))) {
            next = left(next);
            ground.set(next, '|');
        }
        ground.set(next, '|');
        return [next];
    }
    return;
}

const isClay = (ground: Ground, coord: Coord) => ground.get(coord) === '#';
const isWater = (ground: Ground, coord: Coord) => ground.get(coord) === '~';
const isSand = (ground: Ground, coord: Coord) => ground.get(coord) === '.';

function getWall(ground: Ground, last: Coord, func: (coord: Coord) => Coord): Coord {
    let next = last;
    while (ground.get(next) !== '#') {
        if (ground.get(down(next)) === '.') {
            return;
        }
        next = func(next);
    }
    return next;
}


export function part1(lines: string[]): any {
    const ground = createGrid(lines);
    console.log(ground.formatSlice([494, 0], [507, 13], s => s));
    let coords = [[500, 0]];
    for (let i = 0; i < 30; i++) {
        const next = [];
        for (const c of coords) {
            next.push(... next(ground, c));
        }
        coords = next;
    }
    console.log(ground.formatSlice([494, 0], [507, 13], s => s));
    console.log(water);
    return 0;
}

export function part2(_input: string[]): any {
    return 0;
}
