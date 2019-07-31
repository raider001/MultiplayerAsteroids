export class RequestWrapper {
    private request: string;
    private requestData: any;

    constructor(request: string, requestData: any) {
        this.request = request;
        this.requestData = requestData;
    }
}
