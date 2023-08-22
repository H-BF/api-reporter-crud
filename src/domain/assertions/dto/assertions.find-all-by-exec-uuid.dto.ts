import { IsUUID } from 'class-validator';

export class AssertionsFindAllByExecUuidDto {

    @IsUUID()
    executionUuid!: string

}