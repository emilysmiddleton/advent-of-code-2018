type Expectation = {
    input: string,
    expected: any
}

type PartTest = {
    part: number,
    method: (string) => any,
    fixtures: Expectation[]
}

type DayTest = {
    day: number
    parts: PartTest[]
}
