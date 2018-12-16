export function part1(lines: string[]): any {
    return reduce(lines[0]).length;
}

export function part2(lines: string[]): any {
    const lengths: number[] = ALPHABET.map(character => {
        return reduce(lines[0].replace(new RegExp(character, "gi"), '')).length
    });
    return Math.min(...lengths);
}

function reduce(input: string): string {
    const replaced = input.replace(REGEX, '');
    return (replaced === input) ? replaced : reduce(replaced);
}

const ALPHABET = Array.from('abcdefghijklmnopqrstuvwxyz');
const REGEX = createRegex();

function createRegex() {
    const combinations = [];
    for (const letter of ALPHABET) {
        combinations.push(letter + letter.toUpperCase());
        combinations.push(letter.toUpperCase() + letter);
    }
    return new RegExp(combinations.join("|"), "g");
}
