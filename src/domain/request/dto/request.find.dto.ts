import { IsUUID } from 'class-validator';

export class RequestFindDto {

    @IsUUID()
    uuid!: string

}