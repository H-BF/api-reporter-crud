import { Method } from "@prisma/client"

export class Request {
  
    constructor(
        private _method: Method,
        private _url: string,
        private _header: string,
        private _body: string
    ) {}

    public get method(): Method {
        return this._method
    }
    
    public set method(value: Method) {
        this._method = value
    }
    
    public get url(): string {
        return this._url
    }
    
    public set url(value: string) {
        this._url = value
    }

    public get header(): string {
        return this._header
    }
    public set header(value: string) {
        this._header = value
    }

    public get body(): string {
        return this._body
    }
    public set body(value: string) {
        this._body = value
    }
}