import { part1, part2 } from '../../src/day7/main';

export const day7: DayTest = {
    day: 7,

    parts: [
        {
            part: 1,
            method: part1,
            fixtures: [
                {
                    input: 'Step C must be finished before step A can begin.\n' +
                    'Step C must be finished before step F can begin.\n' +
                    'Step A must be finished before step B can begin.\n' +
                    'Step A must be finished before step D can begin.\n' +
                    'Step B must be finished before step E can begin.\n' +
                    'Step D must be finished before step E can begin.\n' +
                    'Step F must be finished before step E can begin.',
                    separator: '\n',
                    expected: 'CABDFE'
                }

            ]
        },
        {
            part: 2,
            method: part2,
            fixtures: [
                {
                    input: 'Step C must be finished before step A can begin.\n' +
                    'Step C must be finished before step F can begin.\n' +
                    'Step A must be finished before step B can begin.\n' +
                    'Step A must be finished before step D can begin.\n' +
                    'Step B must be finished before step E can begin.\n' +
                    'Step D must be finished before step E can begin.\n' +
                    'Step F must be finished before step E can begin.',
                    separator: '\n',
                    expected: 15
                }
            ]
        }
    ]
};
