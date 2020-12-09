import { getValidAttributes } from './index';

describe('ObjectUtils', () => {
    describe('root', () => {
        it('Deve remover atributos nulos', async () => {
            const obj = {
                teste: null,
                teste2: null,
                teste3: 'someinfo',
            };
            expect(getValidAttributes(obj)).toEqual({
                teste3: 'someinfo',
            });
        });

        it('Deve remover atributos indefinidos', async () => {
            const obj = {
                teste: undefined,
                teste2: undefined,
                teste3: 'someinfo',
            };
            expect(getValidAttributes(obj)).toEqual({
                teste3: 'someinfo',
            });
        });

        it('Deve remover atributos nulos dentro de objetos recursivamente', async () => {
            const obj = {
                obj: {
                    teste: null,
                },
                obj2: {
                    obj3: {
                        teste: null,
                    },
                },
                teste3: 'someinfo',
            };
            expect(getValidAttributes(obj)).toEqual({
                obj: {},
                obj2: {
                    obj3: {},
                },
                teste3: 'someinfo',
            });
        });

        it('Deve remover atributos indefinidos dentro de objetos recursivamente', async () => {
            const obj = {
                obj: {
                    teste: undefined,
                },
                obj2: {
                    obj3: {
                        teste: undefined,
                    },
                },
                teste3: 'someinfo',
            };
            expect(getValidAttributes(obj)).toEqual({
                obj: {},
                obj2: {
                    obj3: {},
                },
                teste3: 'someinfo',
            });
        });
    });
});
