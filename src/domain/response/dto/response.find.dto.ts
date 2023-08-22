import { IsUUID } from 'class-validator';

export class ResponseFindDto {

    @IsUUID()
    uuid!: string

}