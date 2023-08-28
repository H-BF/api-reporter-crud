import { IsUUID } from 'class-validator';

export class JsonSchemaFindDto {

    @IsUUID()
    uuid!: string

}