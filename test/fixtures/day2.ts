import { part1, part2 } from '../../src/day2/main';

export const day2: DayTest = {
    day: 2,

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
