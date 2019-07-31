import { PlayerControlData } from '@/tslib/dataObjects/PlayerControlData';

export class Player {

    private playerControlData: PlayerControlData = new PlayerControlData();

    constructor(token: string) {
        this.playerControlData.token = token;
    }

    public getPlayerData(): PlayerControlData {

        return this.playerControlData;
    }

    public increaseVelocity(accelerating: boolean): void {

        this.playerControlData.accelerating = accelerating;
    }

    public rotateLeft(rotateLeft: boolean): void {
        this.playerControlData.rotateLeft = rotateLeft;
    }

    public fireBullet(fire: boolean): void {
        this.playerControlData.firing = fire;
    }

    public rotateRight(rotateRight: boolean): void {
        this.playerControlData.rotateRight = rotateRight;
    }
}
