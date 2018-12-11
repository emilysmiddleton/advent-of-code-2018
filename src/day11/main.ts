function getPower(x:number, y: number, serial: number): number {
    // Find the fuel cell's rack ID, which is its X coordinate plus 10.
    const rackId = x + 10;
    // Begin with a power level of the rack ID times the Y coordinate.
    let power = rackId * y;
    // Increase the power level by the value of the grid serial number (your puzzle input).
    power += serial;
    // Set the power level to itself multiplied by the rack ID.
    power *= rackId;
    // Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
    power = (power % 1000 - power % 100) / 100;
    // Subtract 5 from the power level.
    power -= 5;
    return power;
}

function getGrid(size: number, x: number, y: number, powerGrid: number[][]): number {
    if (x + size > 300 || y + size > 300) {
        return -Infinity;
    }
    let sum = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            sum += powerGrid[x + i - 1][y + j - 1];
        }
    }
    return sum;
}

function getPowers(serial: number): number[][] {
    const powerGrid: number[][] = [];
    for (let x = 0; x < 300; x++) {
        powerGrid[x] = [];
        for (let y = 0; y < 300; y++) {
            powerGrid[x][y] = getPower(x + 1, y + 1, serial);
        }
    }
    return powerGrid;
}
export function part1(lines: string[]): any {
    const serial: number = parseInt(lines[0]);
    return getMax(serial, 3, 3);
}

export function part2(lines: string[]): any {
    const serial: number = parseInt(lines[0]);
    return getMax(serial, 1, 300);
}

function getMax(serial: number, minSize: number, maxSize: number) {
    const powerGrid: number[][] = getPowers(serial);
    let max: number = - Infinity;
    let point: string = null;
    for (let x = 1; x <= 300; x++) {
        for (let y = 1; y <= 300; y++) {
            for (let size = minSize; size <= maxSize; size++) {
                const power = getGrid(size, x, y, powerGrid);
                if (power > max) {
                    max = power;
                    point = `${x},${y},${size}`;
                }
            }
        }
    }
    return point;
}
