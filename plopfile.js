module.exports = function (plop) {
    // controller generator
    plop.setGenerator('endpoints', {
        description: 'application controller logic',
        prompts: [
            {
                type: 'input',
                name: 'schemaName',
                message: 'Schema name: ',
            },
            {
                type: 'input',
                name: 'schemaPluralName',
                message: 'Schema plural name: ',
            },
        ],
        actions: [
            {
                type: 'addMany',
                destination: 'src/api/{{camelCase schemaPluralName}}',
                templateFiles: 'plop_templates/endpoints/**/*.hbs',
                base: 'plop_templates/endpoints',
            },
        ],
    });

    plop.setGenerator('typeorm-endpoints', {
        description: 'application controller logic',
        prompts: [
            {
                type: 'input',
                name: 'schemaName',
                message: 'Schema name: ',
            },
            {
                type: 'input',
                name: 'schemaPluralName',
                message: 'Schema plural name: ',
            },
        ],
        actions: [
            {
                type: 'addMany',
                destination: 'src/api/{{camelCase schemaPluralName}}',
                templateFiles: 'plop_templates/typeorm-endpoints/**/*.hbs',
                base: 'plop_templates/typeorm-endpoints',
            },
        ],
    });
};
