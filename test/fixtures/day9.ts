import { part1, part2 } from '../../src/day9/main';

export const day9: DayTest = {
    day: 9,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                {
                    input: '9 players; last marble is worth 25 points',
                    expected: 32
                },
                {
                    input: '10 players; last marble is worth 1618 points',
                    expected: 8317
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
