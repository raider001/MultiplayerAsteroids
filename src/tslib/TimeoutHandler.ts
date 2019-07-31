export class TImeoutHandler {

    private t: any;

    public setLoop(action: () => void, timeout: number) {
        this.t = setInterval(action, timeout);
    }

    public clearLoop() {
        clearInterval(this.t);
    }
}
