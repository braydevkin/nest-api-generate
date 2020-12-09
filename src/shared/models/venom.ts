export interface CheckedNumberUser {
    server: string;
    user: string;
    _serialized: string;
}
export interface CheckedNumberStatus {
    id: CheckedNumberUser;
    status: number;
    isBusiness: boolean;
    canReceiveMessage: boolean;
    numberExists: boolean;
}

export class VenomWhatsappToken {
    WABrowserId!: string;
    WASecretBundle!: string;
    WAToken1!: string;
    WAToken2!: string;
}
