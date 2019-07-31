import { jsonMember, jsonObject } from 'typedjson';
@jsonObject
export class BulletData {
    @jsonMember({ constructor: Number})
    public x: number = 0;
    @jsonMember({ constructor: Number})
    public y: number = 0;
    @jsonMember({ constructor: String })
    public name: string = '';
    @jsonMember({ constructor: Number })
    public rotation: number = 0;

    public size: number = 2;

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 4, 2);
        ctx.fill();
        ctx.restore();
    }

}
