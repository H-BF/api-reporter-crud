import { TestStatus } from "@prisma/client"

export class Assertions {

    constructor(
        private _name: string,
        private _executionUuid: string,
        private _errorMessage: string | null = null,
        private _status: TestStatus
    ) {}

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get executionUuid(): string {
        return this._executionUuid;
    }

    public set executionUuid(value: string) {
        this._executionUuid = value;
    }

    public get errorMessage(): string | null {
        return this._errorMessage;
    }

    public set errorMessage(value: string | null) {
        this._errorMessage = value;
    }

    public get status(): TestStatus {
        return this._status;
    }
    
    public set status(value: TestStatus) {
        this._status = value;
    }
}