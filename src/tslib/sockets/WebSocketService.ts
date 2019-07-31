import { Header } from '@/tslib/sockets/Header';
import { CloseInterface, ErrorInterface, MessageInterface, OpenInterface } from '@/tslib/sockets/SocketInterface';
import { TypedJSON } from 'typedjson';
export class WebSocketService {
    private webSocket: WebSocket;
    private messageListeners: MessageInterface[] = [];
    private closeListeners: CloseInterface[] = [];
    private openListeners: OpenInterface[] = [];
    private errorListeners: ErrorInterface[] = [];

    /**
     *
     * @param location - The  location. Note that the protocal ws is enforced and no prefix is needed on the location.
     * @param port - The port.
     */
    constructor(location: string, authToken?: string) {
        let ws: WebSocket;

        if (authToken === undefined) {
            ws = new WebSocket('ws://' + location);
        } else {
            ws = new WebSocket('ws://' + authToken + '@' + location);
        }

        ws.onclose = (event: CloseEvent) => {
            if (event !== null) {
                this.closeListeners.forEach((item: CloseInterface) => {
                    item(event);
                });
            }
        };

        ws.onmessage = (event: MessageEvent) => {
            if (event !== null) {
                const header: Header = TypedJSON.parse(event.data, Header) as Header;

                this.messageListeners.forEach((item: MessageInterface) => {
                    item(header);
                });
            }
        };

        ws.onerror = (event: Event) => {
            if (event !== null) {
                this.errorListeners.forEach((item: ErrorInterface) => {
                    item(event);
                });
            }
        };

        ws.onopen = (event: Event) => {
            if (event !== null) {
                this.openListeners.forEach((item: OpenInterface) => {
                    item(event);
                });
            }
        };
        this.webSocket = ws;
    }

    public getURL(): string {
        return this.webSocket.url;
    }
    public close(): void {
        this.webSocket.close();
    }

    public addMessageListener(action: MessageInterface): void {
        this.messageListeners.push(action);
    }

    public addCloseListener(action: CloseInterface): void {
        this.closeListeners.push(action);
    }

    public addOpenListener(action: OpenInterface): void {
        this.openListeners.push(action);
    }

    public addErrorListener(action: ErrorInterface): void {
        this.errorListeners.push(action);
    }

    public sendMessage(message: string): void {
        if (this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(message);
        }
    }
}
