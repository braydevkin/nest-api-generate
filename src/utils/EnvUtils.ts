import * as Constants from '@config/Constants';

export async function verifyConstants(): Promise<void> {
    const names = Object.keys(Constants);

    const errors: string[] = [];
    names.forEach((constName) => {
        if (!Constants[constName]) {
            errors.push(`Por favor preencha a variável '${constName}' nas variáveis de ambiente`);
        }
    });

    if (errors.length > 0) {
        errors.forEach((err) => {
            console.log(`- ${err}`);
        });
        throw new Error('Erro ao validar constantes.');
    }
}
