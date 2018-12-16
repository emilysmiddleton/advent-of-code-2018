import { part1, part2 } from '../../src/day12/main';

export const day12: DayTest = {
    day: 12,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                {
                    input: 'initial state: #..#.#..##......###...###\n' +
                    '\n' +
                    '...## => #\n' +
                    '..#.. => #\n' +
                    '.#... => #\n' +
                    '.#.#. => #\n' +
                    '.#.## => #\n' +
                    '.##.. => #\n' +
                    '.#### => #\n' +
                    '#.#.# => #\n' +
                    '#.### => #\n' +
                    '##.#. => #\n' +
                    '##.## => #\n' +
                    '###.. => #\n' +
                    '###.# => #\n' +
                    '####. => #',
                    separator: '\n',
                    expected: 325
                }

            ]
        },
        {
            part: 2,
            method: part2,
            fixtures: [

            ]
        }
    ]
};
