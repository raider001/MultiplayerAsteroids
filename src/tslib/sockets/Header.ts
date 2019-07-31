
import {jsonMember, jsonObject} from 'typedjson';

@jsonObject
export class Header {
    @jsonMember({ constructor: String})
    private token?: string;

    @jsonMember({ constructor: Boolean})
    private successfulRequest?: boolean;

    @jsonMember({ constructor: String})
    private data?: string;

    public getToken(): string {
        return this.token === undefined ? '' : this.token as string;
    }

    public isSuccessful(): boolean {
        return this.successfulRequest === undefined ? false : this.successfulRequest as boolean;
    }

    public getData(): string {
        return this.data === undefined ? '' : this.data as string;
    }
}
