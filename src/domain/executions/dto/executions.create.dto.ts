import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class ExecutionsCreateDto {

    @IsString()
    name!: string

    @IsUUID()
    launchUuid!: string

    @IsUUID()
    requestUuid!: string

    @IsUUID()
    responseUuid!: string

    @IsOptional()
    @IsNumber()
    failCount?: number

    @IsOptional()
    @IsNumber()
    passCount?: number
}