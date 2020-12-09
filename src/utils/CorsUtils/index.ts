export function getDomainWithProtocols(domain: string): string[] {
    if (domain.charAt(domain.length - 1) === '/') {
        domain = domain.slice(0, -1);
    }
    return [`http://${domain}`, `https://${domain}`];
}
