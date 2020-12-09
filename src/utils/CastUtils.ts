// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Cast(obj: any, newObj: any): any {
    const keys = Object.keys(newObj);
    const result = {};
    console.log(keys);
    console.log(obj[keys[0]]);
    console.log(obj);
    keys.forEach((key) => {
        if (obj[key]) {
            result[key] = obj[key];
        }
    });

    return result;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function bodyToObject<T>(body: any, object: T): T {
    const bodyKeys = Object.keys(body);
    const objectKeys = Object.keys(object);
    const result = object;
    console.log(bodyKeys);
    console.log(objectKeys);

    console.log(object);
    bodyKeys.forEach((key) => {
        if (objectKeys[key]) {
            console.log(`[${key}] - ${body[key]} => ${body[key]}`);
            result[key] = body[key];
        }
    });
    const changed = <T>object;
    console.log(changed);
    return <T>object;
}
