import { jsonMember, jsonObject } from 'typedjson';
@jsonObject
export class PlayerStatistics {
    @jsonMember({ constructor: Number })
    public kills: number = 0;

    @jsonMember({ constructor: Number })
    public deaths: number = 0;
}
