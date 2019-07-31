import fs from 'fs';

export class NetworkConfig {
    private static IP_ADDRESS: string = '';
    private filePath: string = process.cwd() + '/network.config';

    public getIpAddress(): string {
        if (NetworkConfig.IP_ADDRESS === '') {
            this.loadConfig();
        }
        console.log('Loaded: ' + NetworkConfig.IP_ADDRESS);
        return NetworkConfig.IP_ADDRESS;
    }

    private loadConfig(): void {
        const data: Buffer = fs.readFileSync(this.filePath);
        NetworkConfig.IP_ADDRESS = data.toString();

    }
}
