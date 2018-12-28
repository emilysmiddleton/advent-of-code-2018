
type State = {
    elf1x: number;
    elf1y: number;
    elf2x: number;
    elf2y: number;
    scores: string[];
}

const CHUNK_LENGTH = 100;

/**
 * This looks needlessly complicated. I'm breaking the string up into chunks of 10,
 * because a single string will end up with 10s of millions of characters, at which
 * point string manipulation is super slow.
 */
function nextState(state: State): void {
    const score1 = parseInt(state.scores[state.elf1x].charAt(state.elf1y));
    const score2 = parseInt(state.scores[state.elf2x].charAt(state.elf2y));
    const next = (score1 + score2).toString();
    const last = state.scores[state.scores.length - 1];
    if (last.length === CHUNK_LENGTH) {
        state.scores.push(next);
    } else if (last.length === CHUNK_LENGTH - 1 && next.length === 2) {
        state.scores[state.scores.length - 1] = last + next.substring(0, 1);
        state.scores.push(next.substring(1));
    } else {
        state.scores[state.scores.length - 1] = last + next;
    }
    const length = getLength(state);
    const elf1 = (state.elf1x * CHUNK_LENGTH + state.elf1y + 1 + score1) % length;
    const elf2 = (state.elf2x * CHUNK_LENGTH + state.elf2y + 1 + score2) % length;
    state.elf1x = Math.floor(elf1 / CHUNK_LENGTH);
    state.elf1y = elf1 % CHUNK_LENGTH;
    state.elf2x = Math.floor(elf2 / CHUNK_LENGTH);
    state.elf2y = elf2 % CHUNK_LENGTH;

}

function getLength(state: State): number {
    return (state.scores.length - 1) * 10 + state.scores[state.scores.length - 1].length;
}

export function part1(lines: string[]): any {
    const recipes = parseInt(lines[0]);
    const state = {
        elf1x: 0,
        elf1y: 0,
        elf2x: 0,
        elf2y: 1,
        scores: ['37']
    };
    nextChunk(state, recipes + 10);
    return state.scores.join('').substring(recipes, recipes + 10);
}

export function part2(lines: string[]): any {
    const start = new Date().getTime();
    const aim = lines[0];
    const state = {
        elf1x: 0,
        elf1y: 0,
        elf2x: 0,
        elf2y: 1,
        scores: ['37']
    };
    let scores = '37';
    while (scores.indexOf(aim) < 0) {
        nextChunk(state, 100000);
        scores = state.scores.join('');
    }
    console.log(new Date().getTime() - start);
    return scores.indexOf(aim);
}

function nextChunk(state: State, repeat: number) {
    for (let i = 0; i < repeat; i++) {
        nextState(state);
    }
}
