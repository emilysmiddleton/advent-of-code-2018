import test from 'ava';
import { fillFromPump } from '../src/day17/main';
import { Grid } from '../src/day13/grid';

test('trickle down until below grid', t => {
    const ground = new Grid<string>([
        ['+'],
        ['.'],
        ['.'],
    ]);
    fillFromPump(ground);
    t.is(ground.toString(s => s), '+\n|\n|');
});

test('trickle down until hits clay', t => {
    const ground = new Grid<string>([
        ['+'],
        ['.'],
        ['.'],
        ['#'],
    ]);
    fillFromPump(ground);
    t.is(ground.toString(s => s), '+\n|\n|\n#');
});

test('fillFromWall row both walls', t => {
    const ground = new Grid<string>([
        ['#', '.', '+', '.', '#'],
        ['#', '.', '.', '.', '#'],
        ['#', '#', '#', '#', '#']
    ]);
    fillFromPump(ground);
    t.is(ground.toString(s => s), '#.+.#\n#~~~#\n#####');
});

test('no walls', t => {
    const ground = new Grid<string>([
        ['.', '.', '+', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '.'],
        ['.', '.', '#', '.', '.']
    ]);
    fillFromPump(ground);
    t.is(ground.toString(s => s), '..+..\n.|||.\n.|#|.\n.|#|.');
});

test('fillFromWall row no left wall', t => {
    const ground = new Grid<string>([
        ['.', '.', '+', '.', '#'],
        ['.', '.', '.', '.', '#'],
        ['.', '#', '#', '#', '#'],
        ['.', '.', '.', '.', '.']
    ]);
    fillFromPump(ground);
    t.is(ground.toString(s => s), '..+.#\n||||#\n|####\n|....');
});

test('fillFromWall row no right wall', t => {
    const ground = new Grid<string>([
        ['#', '.', '+', '.', '.'],
        ['#', '.', '.', '.', '.'],
        ['#', '#', '#', '#', '.'],
        ['.', '.', '.', '.', '.']
    ]);
    fillFromPump(ground);
    t.is(ground.toString(s => s), '#.+..\n#||||\n####|\n....|');
});

test('fillFromWall row no left or right wall', t => {
    const ground = new Grid<string>([
        ['.', '.', '+', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '#', '#', '#', '.'],
        ['.', '.', '.', '.', '.']
    ]);
    fillFromPump(ground);
    t.is(ground.toString(s => s), '..+..\n|||||\n|###|\n|...|');
});

test('inner bucket', t => {
    const ground = new Grid<string>([
        ['.', '.', '.', '.', '+', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.'],
        ['.', '.', '#', '.', '#', '.', '#', '.', '#', '.', '.'],
        ['.', '.', '#', '.', '#', '.', '#', '.', '#', '.', '.'],
        ['.', '.', '#', '.', '#', '#', '#', '.', '#', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.'],
        ['.', '.', '#', '#', '#', '#', '#', '#', '#', '.', '.']
    ]);
    fillFromPump(ground);
    t.is(ground.toString(s => s),
        '....+......\n' +
        '.|||||||||.\n' +
        '.|#~~~~~#|.\n' +
        '.|#~#~#~#|.\n' +
        '.|#~#~#~#|.\n' +
        '.|#~###~#|.\n' +
        '.|#~~~~~#|.\n' +
        '.|#######|.'
    );
});
