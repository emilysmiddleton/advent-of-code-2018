import { part1, part2 } from '../../src/day3/main';

export const day3: DayTest = {
    day: 3,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                { input:
                '#1 @ 0,0: 2x1, ' +
                '#2 @ 0,0: 1x2',
                    expected: 1
                },
                { input:
                '#1 @ 1,3: 4x4, ' +
                '#2 @ 3,1: 4x4, ' +
                '#3 @ 5,5: 2x2',
                    expected: 4
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
