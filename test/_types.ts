type Expectation = {
    separator?: string,
    input: string,
    expected: any
}

type PartTest = {
    part: number,
    method: (lines: string[]) => any,
    fixtures: Expectation[]
}

type DayTest = {
    day: number
    parts: PartTest[]
}
