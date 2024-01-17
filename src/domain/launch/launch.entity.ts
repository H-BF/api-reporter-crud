import { LaunchStatus } from "@prisma/client"

export interface ILaunch {
    pipeline?: string
    job?: string
    srcBranch?: string
    dstBranch?: string
    commit?: string
    failCount?: number
    passCount?: number
    duration?: number
    tag?: string
    status?: LaunchStatus
    serviceName?: string
}

export class Launch {

    private _pipeline?: string
    private _job?: string
    private _srcBranch?: string
    private _dstBranch?: string
    private _commit?: string | undefined
    private _failCount?: number
    private _passCount?: number
    private _duration?: number
    private _tag?: string
    private _status?: LaunchStatus
    private _serviceName?: string

    constructor(data: ILaunch) {
        this._pipeline = data.pipeline
        this._job = data.job
        this._srcBranch = data.srcBranch
        this._dstBranch = data.dstBranch
        this._commit = data.commit
        this._failCount = data.failCount
        this._passCount = data.passCount
        this._duration = data.duration
        this._tag = data.tag
        this._status = data.status
        this._serviceName = data.serviceName
    }

    public get pipeline(): string | undefined {
        return this._pipeline
    }

    public set pipeline(pipline: string) {
        this._pipeline = pipline
    }

    public get job(): string | undefined {
        return this._job
    }

    public set job(job: string) {
        this._job = job
    }

    public get srcBranch(): string | undefined {
        return this._srcBranch
    }

    public set srcBranch(srcBranch: string) {
        this._srcBranch = srcBranch
    }

    public get dstBranch(): string | undefined {
        return this._dstBranch
    }

    public set dstBranch(dstBranch: string) {
        this._dstBranch = dstBranch
    }

    public get commit(): string | undefined {
        return this._commit
    }
    
    public set commit(value: string | undefined) {
        this._commit = value
    }

    public get failCount(): number | undefined {
        return this._failCount
    }

    public set failCount(value: number) {
        this._failCount = value
    }

    public get passCount(): number | undefined {
        return this._passCount
    }

    public set passCount(value: number) {
        this._passCount = value
    }

    public get duration(): number | undefined {
        return this._duration
    }

    public set duration(value: number) {
        this._duration = value
    }

    public get tag(): string | undefined {
        return this._tag
    }

    public set tag(image: string) {
        this._tag = image
    }


    public get status(): LaunchStatus | undefined {
        return this._status
    }

    public set status(value: LaunchStatus) {
        this._status = value
    }

    public get serviceName(): string | undefined {
        return this._serviceName
    }

    public set serviceName(value: LaunchStatus) {
        this._serviceName = value
    }
} 