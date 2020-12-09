import { getDomainWithProtocols } from './index';

describe('CorsUtils', () => {
    describe('root', () => {
        it('should return the domain with HTTP and HTTPs', async () => {
            const domain = 'google.com.br';
            expect(getDomainWithProtocols(domain)).toEqual([`http://${domain}`, `https://${domain}`]);
        });
        it('should return the domain with HTTP and HTTPs', async () => {
            const domain = 'google.com.br/';
            expect(getDomainWithProtocols(domain)).toEqual([`http://google.com.br`, `https://google.com.br`]);
        });
    });
});
