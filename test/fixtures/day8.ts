import { part1, part2 } from '../../src/day8/main';

export const day8: DayTest = {
    day: 8,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                {
                    input: '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2',
                    expected: 138
                },
                {
                    input: '2 3 1 1 0 1 99 2 0 3 10 11 12 1 1 2',
                    expected: 138
                },
                {
                    input: '2 0 0 3 10 11 12 1 1 0 1 99 2',
                    expected: 134
                },
                {
                    input: '2 3 0 3 10 11 12 1 1 0 0 2 1 1 2',
                    expected: 39
                },
            ]
        },
        {
            part: 2,
            method: part2,
            fixtures: [
                {
                    input: '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2',
                    expected: 66
                },
            ]
        }
    ]
};
