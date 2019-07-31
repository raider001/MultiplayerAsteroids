import {jsonMember, jsonObject} from 'typedjson';

@jsonObject
export class LoginData {

    @jsonMember({constructor: String })
    public message: string = '';

    @jsonMember({ constructor: Number })
    public gameWidth: number = 0;

    @jsonMember({ constructor: Number })
    public gameHeight: number = 0;
}
