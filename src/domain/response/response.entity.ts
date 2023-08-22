export class Response {

    constructor(
        private _status: string,
        private _code: number,
        private _header: string,
        private _body: string
    ) {}

    public get status(): string {
        return this._status;
    }

    public set status(value: string) {
        this._status = value;
    }

    public get code(): number {
        return this._code;
    }
    
    public set code(value: number) {
        this._code = value;
    }

    public get header(): string {
        return this._header;
    }
    
    public set header(value: string) {
        this._header = value;
    }

    public get body(): string {
        return this._body;
    }
    
    public set body(value: string) {
        this._body = value;
    }
}