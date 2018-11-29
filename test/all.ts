import test from 'ava';
import { fixtures } from './fixtures/all';

for (const dayTest of fixtures) {
    for (const partTest of dayTest.parts) {
        let testNumber: number = 0;
        for (const fixture of partTest.fixtures) {
            testNumber++;
            const name: string = `day ${dayTest.day}, part ${partTest.part}, test ${testNumber}`;
            test(name, t => {
                const input: string = fixture.input;
                const actual: any = partTest.method(input);
                t.is(actual, fixture.expected);
            });
        }
    }
}
