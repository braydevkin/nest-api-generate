export function sleep(seconds: number): Promise<void> {
    const miliseconds = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, miliseconds);
    });
}

export function convertMinutesToMiliseconds(minutes: number): number {
    return minutes * 60 * 1000;
}

export function convertMilisecondsToMinutes(miliseconds: number): number {
    return miliseconds / 60 / 1000;
}

export function getDifferenceInMinutes(startTimestamp: number, endTimestamp: number): number {
    const difference = endTimestamp - startTimestamp;
    return difference / 1000 / 60;
}
