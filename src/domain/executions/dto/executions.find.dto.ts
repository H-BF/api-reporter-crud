import { IsUUID } from 'class-validator';

export class ExecutionsFindDto {

    @IsUUID()
    uuid!: string

}