import { IsIn, IsNumber, IsOptional, IsUUID } from "class-validator";
import { LaunchStatus } from "@prisma/client";

export class LaunchUpdateDto {

    @IsUUID()
    uuid!: string

    @IsOptional()
    @IsNumber()
    failCount?: number

    @IsOptional()
    @IsNumber()
    passCount?: number

    @IsOptional()
    @IsNumber()
    duration?: number


    @IsOptional()
    @IsIn(Object.keys(LaunchStatus))
    status?: LaunchStatus

}