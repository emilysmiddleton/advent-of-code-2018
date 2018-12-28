import { Coord, Grid, readingOrder, up, down, left, right } from './grid';

export const CARTS = new Set<string>(['>', '<', 'v', '^']);

export type Cart = {
    direction: string,
    nextTurn: string,
    coord: Coord,
    crashed?: boolean
}

function cartOrder(cart1: Cart, cart2: Cart): number {
    return readingOrder(cart1.coord, cart2.coord);
}

export class Tracks {
    private squares: Grid<string>;
    public carts: Cart[];

    constructor(track: string[][], carts: Cart[]) {
        this.squares = new Grid(track);
        this.carts = carts;
    }

    public format(): string {
        const grid = [];
        for (const row of this.squares.squares) {
            grid.push(row.slice());
        }
        for (const cart of this.carts) {
            grid[cart.coord[1]][cart.coord[0]] = cart.direction;
        }
        return new Grid<string>(grid).toString(sq => sq);
    }
    
    public moveCarts(): Coord {
        let firstCrash: Coord = undefined;
        this.carts.sort(cartOrder);
        for (const cart of this.carts) {
            const newPosition = this.move(cart);
            const crash = this.carts.find(c => c !== cart && readingOrder(c.coord, cart.coord) === 0);
            if (crash) {
                cart.crashed = true;
                crash.crashed = true;
                if (!firstCrash) {
                    firstCrash = newPosition;
                }
            }
        }
        this.carts = this.carts.filter(c => !c.crashed);
        return firstCrash;
    }

    private move(cart: Cart): Coord {
        const next = this.nextSquare(cart.direction, cart.coord);
        const track = this.squares.get(next);
        cart.coord = next;
        this.updateDirection(cart, track);
        return next;
    }

    private updateDirection(cart: Cart, track: String): void {
        const current = cart.direction;
        if (track === '-' || track === '|') {
            return;
        }
        // Turn a corner
        if (track === '/') {
            if (current === '<' || current == '>') {
                cart.direction = this.turnLeft(cart.direction);
            } else {
                cart.direction = this.turnRight(cart.direction);
            }
            return;
        }
        if (track === '\\') {
            if (current === '<' || current == '>') {
                cart.direction = this.turnRight(cart.direction);
            } else {
                cart.direction = this.turnLeft(cart.direction);
            }
            return;
        }
        // At an intersection.
        switch (cart.nextTurn) {
            case 'left':
                cart.direction = this.turnLeft(cart.direction);
                cart.nextTurn = 'straight';
                return;
            case 'straight':
                cart.nextTurn = 'right';
                return;
            case 'right':
                cart.direction = this.turnRight(cart.direction);
                cart.nextTurn = 'left';
                return;
        }
    }

    private turnLeft(direction: string) {
        switch (direction) {
            case '>': return '^';
            case '<': return 'v';
            case '^': return '<';
            case 'v': return '>';
        }
    }

    private turnRight(direction: string) {
        switch (direction) {
            case '>': return 'v';
            case '<': return '^';
            case '^': return '>';
            case 'v': return '<';
        }
    }

    public nextSquare(cart: string, coord: Coord): Coord {
        switch (cart) {
            case '>':
                return right(coord);
            case '<':
                return left(coord);
            case '^':
                return up(coord);
            case 'v':
                return down(coord);
        }
    }
}
