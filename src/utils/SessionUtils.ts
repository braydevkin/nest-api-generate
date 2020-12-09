import { Session } from '@database/entity/Session.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

export function getSessionName(userId: string, session: string): string {
    return `${userId}__${session}`;
}

export function validateIfSessionsAreConnected(sessions: Session[]): void {
    const errors: string[] = [];
    for (const session of sessions) {
        if (!session.isConnected) {
            errors.push(`A sessão ${session.name} não está ativa`);
        }
    }

    if (errors.length > 0) {
        throw new HttpException(errors.join(', '), HttpStatus.BAD_REQUEST);
    }
}
