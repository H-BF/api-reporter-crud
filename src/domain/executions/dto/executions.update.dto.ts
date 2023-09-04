import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator"


export class ExecutionUpdateDto {

    @IsUUID()
    uuid!: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsUUID()
    launchUuid?: string

    @IsOptional()
    @IsUUID()
    requestUuid?: string

    @IsOptional()
    @IsUUID()
    responseUuid?: string

    @IsOptional()
    @IsNumber()
    failCount?: number

    @IsOptional()
    @IsNumber()
    passCount?: number
}
