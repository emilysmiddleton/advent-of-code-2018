
const REGEX = new RegExp('(\\d+) players; last marble is worth (\\d+) points');
export function part1(lines: string[]): any {
    const regex = REGEX.exec(lines[0]);
    return play(parseInt(regex[2]), parseInt(regex[1]));
}

export function part2(lines: string[]): any {
    const regex = REGEX.exec(lines[0]);
    return play(parseInt(regex[2]) * 100, parseInt(regex[1]));
}

function play(largest: number, players: number) {
    const scores = Array(players).fill(0);

    const start: Marble = new Marble(0);
    start.next = start;
    start.prev = start;

    let player = 1;
    let current: Marble = start;
    for (let i = 1; i < largest; i++) {
        if (i % 23 === 0) {
            const toRemove = current.prev.prev.prev.prev.prev.prev.prev;
            toRemove.remove();
            scores[player] = scores[player] + i + toRemove.score;
            current = toRemove.next;
        }
        else {
            const newMarble = new Marble(i);
            current.next.insertAfter(newMarble);
            current = newMarble;
        }
        player = (player + 1) % players;
    }
    return Math.max(...scores);
}

class Marble {
    score: number;
    next: Marble;
    prev: Marble;

    constructor(score: number) {
        this.score = score;
    }

    insertAfter(marble: Marble) {
        marble.next = this.next;
        marble.prev = this;
        this.next.prev = marble;
        this.next = marble;
    }

    remove() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }

    toString() {
        return this.prev.score + " -> " + this.score + ' -> ' + this.next.score;
    }

}
