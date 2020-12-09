import { canAccess, comparePasswords, decodeToken, generateToken, getHashPassword, verifyRole } from './index';
import { TokenInfos } from '@/shared/models';

describe('AuthUtils', () => {
    let password: string;

    describe('root', () => {
        beforeEach(async () => {
            password = Math.random().toString(36).substring(8);
        });

        it('Deve criptografar a senha', async () => {
            const hashPassword = await getHashPassword(password);
            expect(hashPassword).not.toBe(password);
        });

        it('A senha criptografada deve ser reconhecida como igual a nao criptografada', async () => {
            const hashPassword = await getHashPassword(password);
            expect(await comparePasswords(password, hashPassword)).toBe(true);
        });

        it('Deve criptografar as informacoes do token', async () => {
            const tokenInfos: TokenInfos = {
                _id: 'asdasdasdad',
                email: 'email@gmail.com',
                lastname: 'Sobrenome',
                name: 'Nome',
                roles: ['Role1', 'Role2'],
            };
            const token = await generateToken(tokenInfos);
            expect(token).not.toBe(tokenInfos);
            expect(token).not.toBeInstanceOf(String);
        });

        it('Deve descriptografar as informacoes do token', async () => {
            const tokenInfos: TokenInfos = {
                _id: 'asdasdasdad',
                email: 'email@gmail.com',
                lastname: 'Sobrenome',
                name: 'Nome',
                roles: ['Role1', 'Role2'],
            };
            const token = await generateToken(tokenInfos);
            const decodedToken = await decodeToken(token);

            expect(decodedToken).toMatchObject(tokenInfos);
        });

        it('Deve poder acessar', async () => {
            const roles = ['role2', 'role1'];
            const requestedRoles = ['role1'];

            expect(canAccess(roles, requestedRoles)).toBe(true);
        });

        it('Deve bloquear o acesso', async () => {
            const roles = ['role3'];
            const requestedRoles = ['role1', 'role2'];

            expect(canAccess(roles, requestedRoles)).toBe(false);
        });
    });
});
