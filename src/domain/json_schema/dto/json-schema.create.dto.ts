import { IsString, IsUUID } from "class-validator"

export class JsonSchemaCreateDto {
    
    @IsString()
    name!: string

    @IsUUID()
    launchUuid!: string

    @IsString()
    schema!:string
}