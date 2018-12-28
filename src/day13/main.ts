import { Cart, CARTS, Tracks } from './tracks';

function parseGrid(rawInputs: string[]): Tracks {
    const grid: string[][] = [];
    const carts: Cart[] = [];
    let y = 0;
    for (const line of rawInputs) {
        const track = [];
        let x = 0;
        for (const sq of Array.from(line)) {

            track.push(parseTrack(sq));
            if (CARTS.has(sq)) {
                carts.push({
                    direction: sq,
                    nextTurn: 'left',
                    coord: [x, y]
                });
            }
            x++;
        }
        grid.push(track);
        y++;
    }
    return new Tracks(grid, carts);
}

function parseTrack(content: string): string {
    if (content === '<' || content === '>') {
        return '-';
    }
    if (content === 'v' || content === '^') {
        return '|';
    }
    return content;
}

export function part1(lines: string[]): any {
    const tracks = parseGrid(lines);
    let crashSite = undefined;
    while (!crashSite) {
        crashSite = tracks.moveCarts();
    }
    return crashSite;
}

export function part2(lines: string[]): any {
    const tracks = parseGrid(lines);
    let carts = tracks.carts.length;
    while (carts > 1) {
        tracks.moveCarts();
        carts = tracks.carts.length;
    }
    return tracks.carts[0].coord;
}
