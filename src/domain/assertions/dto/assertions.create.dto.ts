import { TestStatus } from "@prisma/client"
import { IsIn, IsOptional, IsString, IsUUID } from "class-validator"

export class AssertionsCreateDto {

    @IsString()
    name!: string

    @IsUUID()
    executionUuid!: string

    @IsString()
    @IsOptional()
    errorMessage?: string

    @IsIn(Object.keys(TestStatus))
    status!: TestStatus
}