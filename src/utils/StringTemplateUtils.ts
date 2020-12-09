interface ExtractedTemplate {
    variables: string[];
    cleanedText: string;
}
interface TemplateExtractorFactory {
    extract: (str: string) => ExtractedTemplate;
    clean: (str: string, variables: string[]) => string;
}
export function templateFactory(start: string, end: string): TemplateExtractorFactory {
    const matcher = new RegExp(`${start}(.*?)${end}`, 'gm');
    const normalise = (str: string) => str.slice(start.length, end.length * -1);

    const clean = (str: string, variables: string[]): string => {
        let cleanedStr = str;

        if (variables) {
            for (const variable of variables) {
                cleanedStr = cleanedStr.replace(`${start}${variable}${end}`, '');
            }
        }

        return cleanedStr;
    };

    const extract = (str: string): ExtractedTemplate => {
        const matches = str.match(matcher);

        const variables = matches ? matches.map(normalise) : [];

        const cleanedText = clean(str, variables);

        return {
            variables,
            cleanedText,
        };
    };

    return {
        extract,
        clean,
    };
}

export const variablesExtractor = templateFactory('%%', '%%');
