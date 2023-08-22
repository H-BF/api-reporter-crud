export class Executions {

    constructor(
        private _name: string,
        private _launchUuid: string,
        private _requestUuid: string,
        private _responseUuid: string
    ) {}

    public get name(): string {
        return this._name;
    }
    
    public set name(value: string) {
        this._name = value;
    }

    public get launchUuid(): string {
        return this._launchUuid;
    }
    
    public set launchUuid(value: string) {
        this._launchUuid = value;
    }

    public get requestUuid(): string {
        return this._requestUuid;
    }
    
    public set requestUuid(value: string) {
        this._requestUuid = value;
    }

    public get responseUuid(): string {
        return this._responseUuid;
    }
    public set responseUuid(value: string) {
        this._responseUuid = value;
    }

}