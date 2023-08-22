import { Method } from "@prisma/client";
import { IsIn, IsJSON, IsString } from "class-validator";

export class RequestCreateDto {

    @IsIn(Object.keys(Method))
    method!: Method

    @IsString()
    url!: string

    @IsJSON()
    header!: string
    
    @IsJSON()
    body!: string
}