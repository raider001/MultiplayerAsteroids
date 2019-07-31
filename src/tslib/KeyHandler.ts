export class KeyHandler {
    private keyMap: Map<number, KeyState> = new Map<number, KeyState>();


    public constructor() {
        addEventListener('keydown', this.setKeyToDown.bind(this));
        addEventListener('keyup', this.setKeyToUp.bind(this));
    }

    public getKeyState(key: number): KeyState {
        if (this.keyMap.has(key)) {
            return this.keyMap.get(key) as KeyState;
        }
        return KeyState.UP;
    }

    private setKeyToDown(event: KeyboardEvent): void {
        this.keyMap.set(event.keyCode, KeyState.DOWN);
    }

    private setKeyToUp(event: KeyboardEvent): void {
        this.keyMap.set(event.keyCode, KeyState.UP);
    }
}

export enum KeyState {
    DOWN,
    UP,
}
