export function verifyRole(roles: string[], role: string): boolean {
    return roles.indexOf(role) >= 0;
}

export function canAccess(userRoles: string[], requestedRoles: string[]): boolean {
    return requestedRoles.some((role) => userRoles.indexOf(role) >= 0);
}
