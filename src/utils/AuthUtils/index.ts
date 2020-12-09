import * as jwt from 'jsonwebtoken';
import { JWT_SALT } from '@config/Constants';
import * as bcrypt from 'bcrypt';
import { TokenInfos } from '@shared/models';

export function verifyRole(roles: string[], role: string): boolean {
    return roles.indexOf(role) >= 0;
}

export function canAccess(userRoles: string[], requestedRoles: string[]): boolean {
    return requestedRoles.some((role) => userRoles.indexOf(role) >= 0);
}

export async function generateToken(data: TokenInfos): Promise<string> {
    return jwt.sign(data, JWT_SALT, { expiresIn: '600d' });
}

export async function decodeToken(token: string): Promise<TokenInfos> {
    const data = (await jwt.verify(token, JWT_SALT)) as TokenInfos;
    return data;
}

export async function getHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function comparePasswords(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
}
