import { IsUUID } from 'class-validator';

export class JsonSchemaFindAllByLaunchUuidDto {

    @IsUUID()
    launchUuid!: string

}