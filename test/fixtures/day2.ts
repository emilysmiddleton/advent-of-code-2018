import { part1, part2 } from '../../src/day2/main';

export const day2: DayTest = {
    day: 2,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                {
                    input:
                    'abcdef\n' +
                    'bababc\n' +
                    'abbcde\n' +
                    'abcccd\n' +
                    'aabcdd\n' +
                    'abcdee\n' +
                    'ababab',
                    expected: '12'
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
