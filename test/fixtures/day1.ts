import { part1, part2 } from '../../src/day1/main';

export const day1: DayTest = {
    day: 1,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                { input: 'todo', expected: 0 }
            ]
        },
        {
            part: 2,
            method: part2,
            fixtures: [
                { input: 'todo', expected: 0 }
            ]
        }
    ]
};
