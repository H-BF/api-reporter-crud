import { IsUUID } from 'class-validator';

export class AssertionsFindDto {

    @IsUUID()
    uuid!: string

}