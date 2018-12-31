export type Coord = number[];

export function readingOrder(xy1: Coord, xy2: Coord): number {
    if (xy1[1] === xy2[1]) {
        return xy1[0] - xy2[0];
    }
    return xy1[1] - xy2[1];
}

export function left(coord: Coord) {
    return [coord[0] - 1, coord[1]];
}

export function right(coord: Coord) {
    return [coord[0] + 1, coord[1]];
}

export function up(coord: Coord) {
    return [coord[0], coord[1] - 1];
}

export function down(coord: Coord) {
    return [coord[0], coord[1] + 1];
}

export function equals(c1: Coord, c2: Coord) {
    return c1 && c2 && c1[0] === c2[0] && c1[1] === c2[1];
}

export function getAdjacent(coord: Coord): Coord[] {
    return [
        up(coord),
        left(coord),
        right(coord),
        down(coord)
    ];
}

export class Grid<T> {

    public squares: T[][];

    constructor(squares: T[][]) {
        this.squares = squares;
    }

    public set(coord: Coord, t: T): void {
        this.squares[coord[1]][coord[0]] = t;
    }

    public get(coord: Coord): T {
        return this.get2(coord[0], coord[1]);
    }

    public get2(x: number, y: number): T {
        const row = this.squares[y];
        return row ? row[x] : undefined;
    }

    private width(): number {
        return this.squares[0].length;
    }

    private height(): number {
        return this.squares.length;
    }

    public getAllMatching(predicate: (t: T) => boolean): Coord[] {
        const targets = [];
        for (let y = 0; y < this.height(); y++) {
            for (let x = 0; x < this.width(); x++) {
                if (predicate(this.get2(x, y))) {
                    targets.push([x, y]);
                }
            }
        }
        return targets;
    }

    public getAdjacentMatching(coord: Coord, predicate: (t: T) => boolean): Coord[] {
        return getAdjacent(coord).filter(xy => this.withinGrid(xy) && predicate(this.get(xy)));
    }

    public withinGrid(coord: Coord): boolean {
        return coord[0] >= 0
            && coord[1] >= 0
            && coord[0] < this.width()
            && coord[1] < this.height()
    }

    public toString(format: (t:T) => string) {
        return this.squares.map(value => {
            return value.map(format).join('');
        }).join('\n');
    }

    public formatSlice(from: Coord, to: Coord, format: (t:T) => string) {
        return this.squares
            .slice(from[1], to[1] + 1)
            .map(value => value.slice(from[0], to[0] + 1).map(format).join(''))
            .join('\n');
    }

}
