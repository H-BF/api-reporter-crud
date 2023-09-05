import { IsNumberString, IsOptional, IsUUID } from 'class-validator';

export class ExecutionsFindAllByLaunchUuidDto {

    @IsUUID()
    launchUuid!: string

    @IsNumberString()
    @IsOptional()
    offset?: number

    @IsNumberString()
    @IsOptional()
    limit?: number
}