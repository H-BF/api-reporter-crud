import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";
import { LaunchStatus } from "@prisma/client";

export class LaunchFindWhereDto {

    @IsOptional()
    @IsString()
    pipeline?: string

    @IsOptional()
    @IsString()
    job?: string

    @IsOptional()
    @IsString()
    srcBranch?: string

    @IsOptional()
    @IsString()
    dstBranch?: string

    @IsOptional()
    @IsString()
    commit?: string

    @IsOptional()
    @IsString()
    hbfTag?: string

    @IsNumberString()
    @IsOptional()
    offset?: number

    @IsNumberString()
    @IsOptional()
    limit?: number

    @IsOptional()
    @IsIn(Object.keys(LaunchStatus))
    status?: LaunchStatus
}