const INPUT_PATTERN: RegExp = new RegExp('\\[(\\d{4}-\\d{2}-\\d{2}) (\\d{2}):(\\d{2})\\] (.*)');
const GUARD_PATTERN: RegExp = new RegExp('Guard #(\\d+) begins shift');

type LogLine = {
    date: Date,
    description: string
}

type Guard = {
    id: number,
    minutes: number[]
}

function parseLine(line: string): LogLine {
    const matched: RegExpExecArray = INPUT_PATTERN.exec(line);
    const date: Date = new Date(matched[1]);
    date.setUTCHours(parseInt(matched[2]), parseInt(matched[3]));
    return {
        date: date,
        description: matched[4]
    }
}

function getGuards(logs: LogLine[]): Guard[] {
    const map = new Map<number, Guard>();
    let guard: Guard = null;
    let from: Date = null;
    for (const line of logs) {
        const guardLine: RegExpExecArray = GUARD_PATTERN.exec(line.description);
        if (guardLine) {
            const id: number = parseInt(guardLine[1]);
            if (map.has(id)) {
                guard = map.get(id);
            }
            else {
                guard = {
                    id: parseInt(guardLine[1]),
                    minutes: []
                };
                for (let i = 0; i < 60; i++) { guard.minutes[i] = 0; }
                map.set(guard.id, guard);
            }
        }
        if (line.description === 'falls asleep') {
            from = line.date;
        }
        if (line.description === 'wakes up') {
            for (let i = from.getMinutes(); i < line.date.getMinutes(); i++) {
                guard.minutes[i] = guard.minutes[i] + 1;
            }
        }
    }
    const guards: Guard[] = [];
    map.forEach(value => guards.push(value));
    return guards;
}

function sleepiestGuard(guards: Guard[]): Guard {
    return guards.reduce((a: Guard, b: Guard) => {
        const totalA = getTotal(a.minutes);
        const totalB = getTotal(b.minutes);
        return totalA > totalB ? a : b;
    })
}

function getTotal(minutes: number[]): number {
    return minutes.reduce((a: number, b: number) => a + b, 0);
}

export function part1(lines: string[]): any {
    const parsed: LogLine[] = lines.map(parseLine);
    parsed.sort((a, b) => a.date.getTime() - b.date.getTime());
    const guards: Guard[] = getGuards(parsed);
    const guard: Guard = sleepiestGuard(guards);
    const minute: number = guard.minutes.lastIndexOf(Math.max(...guard.minutes));
    return minute * guard.id;
}

export function part2(_input: string[]): any {
    return 0;
}
