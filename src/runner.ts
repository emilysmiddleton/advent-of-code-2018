import {part1, part2} from './day1/main'

run();

async function run() {
    const readStream: ReadableStream = require('fs').createReadStream('/Users/middletone/checkouts/advent-of-code-2018/src/day1/input.txt');
    const lines: string[] = await parseLines(readStream);
    console.log("Part 1");
    console.log(part1(lines));
    console.log("Part 2");
    console.log(part2(lines));
}

async function parseLines(input: ReadableStream): Promise<string[]> {
    return new Promise<string[]>((resolve, _reject) => {
        const lines: string[] = [];
        var lineReader = require('readline').createInterface({
            input: input
        });
        lineReader.on('line', function (line) {
            lines.push(line);
        });
        lineReader.on('close', function() {
            lineReader.close();
            resolve(lines);
        });
    });
}
