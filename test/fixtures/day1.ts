import { part1, part2 } from '../../src/day1/main';

export const day1: DayTest = {
    day: 1,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                { input: '+1, -2, +3, +1', expected: 3 },
                { input: '+1, +1, +1', expected: 3},
                { input: '+1, +1, -2', expected: 0},
                { input: '-1, -2, -3', expected: -6}
            ]
        },
        {
            part: 2,
            method: part2,
            fixtures: [
                { input: '+1, -1', expected: 0 },
                { input: '+3, +3, +4, -2, -4', expected: 10 },
                { input: '-6, +3, +8, +5, -6', expected: 5 },
                { input: '+7, +7, -2, -7, -4', expected: 14 },
            ]
        }
    ]
};
