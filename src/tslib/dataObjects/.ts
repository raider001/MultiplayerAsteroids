import {jsonMember, jsonObject} from 'typedjson';

@jsonObject
export class PlayerControlData {

    @jsonMember({constructor: String })
    public token: string = '';

    @jsonMember({ constructor: Boolean })
    public accelerating: boolean = false;

    @jsonMember({ constructor: Boolean })
    public rotateLeft: boolean = false;

    @jsonMember({ constructor: Boolean })
    public firing: boolean = false;

    @jsonMember({ constructor: Boolean })
    public rotateRight: boolean = false;
}
