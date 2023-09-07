export class CORSError extends Error {

    origin: string

    constructor(origin: string, msg?: string) {
        super()
        this.message = msg || ""
        this.origin = origin
    }
}