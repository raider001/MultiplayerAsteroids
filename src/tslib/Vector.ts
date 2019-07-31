export class Vector {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
     this.x = x;
     this.y = y;
    }

    public magnitude = (): number => {
     return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public magSq = (): number => {
     return this.x * this.x + this.y * this.y;
    }

    public normalize = (magnitude: number = 1): Vector => {
     const len: number = Math.sqrt(this.x * this.x + this.y * this.y);
     this.x /= len;
     this.y /= len;
     return this;
    }

    public zero = (): void => {
     this.x = 0;
     this.y = 0;
    }

    public copy = (point: Vector): void => {
     this.x = point.x;
     this.y = point.y;
    }

    public rotate = (radians: number): void => {
     const cos: number = Math.cos(radians);
     const sin: number = Math.sin(radians);
     const x: number = (cos * this.x) + (sin * this.y);
     const y: number = (cos * this.y) - (sin * this.x);
     this.x = x;
     this.y = y;
    }

    public getAngle = (): number => {
     return Math.atan2(this.y, this.x);
    }

    public multiply = (value: number): void => {
     this.x *= value;
     this.y *= value;
    }

    public add = (value: Vector): void => {
     this.x += value.x;
     this.y += value.y;
    }

    public subtract = (value: Vector): void => {
     this.x -= value.x;
     this.y -= value.y;
    }
}
