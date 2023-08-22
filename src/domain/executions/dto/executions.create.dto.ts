import { IsString, IsUUID } from "class-validator"

export class ExecutionsCreateDto {

    @IsString()
    name!: string

    @IsUUID()
    launchUuid!: string

    @IsUUID()
    requestUuid!: string

    @IsUUID()
    responseUuid!: string
}