import { IsUUID } from 'class-validator';

export class ExecutionsFindAllByLaunchUuidDto {

    @IsUUID()
    launchUuid!: string

}