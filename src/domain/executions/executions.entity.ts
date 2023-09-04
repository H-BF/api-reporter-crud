
export interface IExecutions {
    name?: string,
    launchUuid?: string,
    requestUuid?: string,
    responseUuid?: string,
    failCount?: number,
    passCount?: number
}

export class Executions {

    private _name?: string
    private _launchUuid?: string
    private _requestUuid?: string
    private _responseUuid?: string
    private _failCount?: number | undefined
    private _passCount?: number | undefined

    constructor(data: IExecutions) {
        this._name = data.name
        this._launchUuid = data.launchUuid
        this._requestUuid = data.requestUuid
        this._responseUuid = data.responseUuid
        this._failCount = data.failCount
        this._passCount = data.passCount
    }

    public get name(): string | undefined {
        return this._name;
    }
    
    public set name(value: string) {
        this._name = value;
    }

    public get launchUuid(): string | undefined {
        return this._launchUuid;
    }
    
    public set launchUuid(value: string) {
        this._launchUuid = value;
    }

    public get requestUuid(): string | undefined {
        return this._requestUuid;
    }
    
    public set requestUuid(value: string) {
        this._requestUuid = value;
    }

    public get responseUuid(): string | undefined {
        return this._responseUuid;
    }

    public set responseUuid(value: string) {
        this._responseUuid = value;
    }

    public get failCount(): number | undefined {
        return this._failCount
    }

    public set failCount(value: number | undefined) {
        this._failCount = value
    }

    public get passCount(): number | undefined {
        return this._passCount
    }
    
    public set passCount(value: number | undefined) {
        this._passCount = value
    }

}