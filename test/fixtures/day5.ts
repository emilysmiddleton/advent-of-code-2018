import { part1, part2 } from '../../src/day5/main';

export const day5: DayTest = {
    day: 5,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                {
                    input: 'dabAcCaCBAcCcaDA',
                    expected: 10
                }

            ]
        },
        {
            part: 2,
            method: part2,
            fixtures: [
                {
                    input: 'dabAcCaCBAcCcaDA',
                    expected: 4
                }
            ]
        }
    ]
};
