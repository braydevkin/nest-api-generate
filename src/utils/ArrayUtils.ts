import * as _ from 'lodash';

export function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function splitArray<T>(array: T[], nParts: number): T[][] {
    return _.chunk(array, nParts);
}

export function splitArrayIntoNArrays<T>(array: T[], nParts: number): T[][] {
    const arrayCopy = [...array];
    const newArrayOfArrays = [];

    let newArrayIndex = 0;

    for (let i = arrayCopy.length; i > 0; i--) {
        if (!newArrayOfArrays[newArrayIndex]) {
            newArrayOfArrays[newArrayIndex] = [];
        }

        newArrayOfArrays[newArrayIndex].push(arrayCopy.pop());

        if (newArrayIndex === nParts - 1) {
            newArrayIndex = 0;
        } else {
            newArrayIndex++;
        }
    }

    return newArrayOfArrays;
}

export function unifyArrays<T>(arrays: T[][]): T[] {
    const union = [];
    for (const arr of arrays) {
        union.push(...arr);
    }

    return union;
}

export function getOnlyUniques<T>(value: T, index: number, self: T[]): boolean {
    return self.indexOf(value) === index;
}
