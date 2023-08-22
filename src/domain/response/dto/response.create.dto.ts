import { IsNumber, IsString } from "class-validator"

export class ResponseCreateDto {

    @IsString()
    status!: string

    @IsNumber()
    code!: number

    @IsString()
    header!: string

    @IsString()
    body!: string
}