export class AnyContact {
    name?: string;
    cellphone: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
