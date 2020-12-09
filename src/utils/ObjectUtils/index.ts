/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function getValidAttributes(obj: any): any {
    Object.keys(obj).forEach(function (key) {
        if (obj[key] && typeof obj[key] === 'object') getValidAttributes(obj[key]);
        else if (obj[key] == null) delete obj[key];
    });
    return obj;
}
