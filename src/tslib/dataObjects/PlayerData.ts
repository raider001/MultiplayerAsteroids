import { jsonMember, jsonObject } from 'typedjson';
import { Utils } from '@/tslib/utils/Utils';
@jsonObject
export class PlayerData {
    @jsonMember({ constructor: Number})
    public x: number = 0;
    @jsonMember({ constructor: Number})
    public y: number = 0;
    @jsonMember({ constructor: String })
    public name: string = '';
    @jsonMember({ constructor: Number })
    public rotation: number = 0;
    @jsonMember({ constructor: Number})
    public health: number = 0;
    @jsonMember({ constructor: Number})
    public shield: number = 0;

    public size: number = 5;

    public render(ctx: CanvasRenderingContext2D): void {
        const shieldVal: string = Utils.numberToHex(Math.ceil(this.shield / 25 * 255));
        const hexVal: string = Utils.numberToHex(Math.ceil(this.health / 100 * 255));
        ctx.save();
        ctx.font = '10px Comic Sans MS';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y - 20 );

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.moveTo(3 * this.size, 0);
        ctx.lineTo(-2 * this.size, -2 * this.size);
        ctx.lineTo(-1 * this.size, 0);
        ctx.lineTo(-2 * this.size, 2 * this.size);
        ctx.lineTo(3 * this.size, 0);
        ctx.strokeStyle = '#' + shieldVal + shieldVal + shieldVal;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#FF' + hexVal + hexVal;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
