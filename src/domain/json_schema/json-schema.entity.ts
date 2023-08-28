
export interface IJsonSchema {
    name: string,
    launchUuid: string,
    schema: string
}

export class JsonSchema {
    private _name: string
    private _launchUuid: string
    private _schema: string

    constructor(data: IJsonSchema) {
        this._name = data.name,
        this._launchUuid = data.launchUuid
        this._schema = data.schema
    }

    public get name(): string {
        return this._name
    }

    public set name(value: string) {
        this._name = value
    }

    public get launchUuid(): string {
        return this._launchUuid
    }
    
    public set launchUuid(value: string) {
        this._launchUuid = value
    }

    public get schema(): string {
        return this._schema
    }

    public set schema(value: string) {
        this._schema = value
    }
}