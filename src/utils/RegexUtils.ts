class SearchRegexOptions {
    ignoreCase = true;
    globalSearch = false;
}
export function getSearchRegex(
    value: string,
    options: SearchRegexOptions = { ignoreCase: true, globalSearch: false },
): RegExp {
    let flags = '';
    if (options.ignoreCase === true) flags += 'i';
    if (options.globalSearch === true) flags += 'g';

    const regex = new RegExp(value, flags);

    return regex;
}

export function sanitizeToURLSafe(value: string): string {
    return value.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}
