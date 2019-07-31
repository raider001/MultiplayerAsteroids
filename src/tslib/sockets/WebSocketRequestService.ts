import { Header } from '@/tslib/sockets/Header';
import { CloseInterface, ErrorInterface, MessageInterface, OpenInterface } from '@/tslib/sockets/SocketInterface';
import { TypedJSON } from 'typedjson';
import { isNull, isUndefined } from 'util';

export class WebSocketRequestService {
    private location: string;
    private messageListener?: MessageInterface;
    private closeListener?: CloseInterface;
    private errorListener?: ErrorInterface;
    private timeoutObj: any;
    /**
     *
     * @param location - The  location. Note that the protocal ws is enforced and no prefix is needed on the location.
     * @param port - The port.
     */
    constructor(location: string) {
        this.location = 'ws://' + location;
    }

    /**
     * Allows for a custom handling on the client.
     * @param action - the action to be performed.
     */
    public setOnError(action: ErrorInterface) {
        this.errorListener = action;
    }

    /**
     * Allows for a custom handling on the client.
     * @param action - the action to be performed.
     */
    public setOnReply(action: MessageInterface) {
        this.messageListener = action;
    }

    /**
     * Allows for a custom handling on the client.
     * @param action - the action to be performed.
     */
    public setOnClose(action: CloseInterface) {
        this.closeListener = action;
    }

    /**
     * @param data Opens a socket for a request style response.
     */
    public sendRequest(data: string): void {
        const socket: WebSocket = new WebSocket(this.location);
        socket.onopen = () => {
            socket.send(data);
            console.log('sending:' + data);
            this.timeoutObj = setTimeout(() => {
                socket.close();
            }, 3000);

        };

        socket.onmessage = (event: MessageEvent) => {
            clearTimeout(this.timeoutObj);

            if (isNull(this.messageListener)) {
                return;
            }
            if (isUndefined(this.messageListener)) {
                return;
            }

            const header: Header = TypedJSON.parse(event.data, Header) as Header;
            console.log(header.getToken());
            this.messageListener(header);
        };

        socket.onerror = (event: Event) => {
            clearTimeout(this.timeoutObj);
            if (isNull(this.errorListener)) {
                return;
            }
            if (isUndefined(this.errorListener)) {
                return;
            }

            this.errorListener(event);
        };

        socket.onclose = (event: CloseEvent) => {
            clearTimeout(this.timeoutObj);
            if (isNull(this.closeListener)) {
                return;
            }
            if (isUndefined(this.closeListener)) {
                return;
            }

            this.closeListener(event);
        };
    }
}
