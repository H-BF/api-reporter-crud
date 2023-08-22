import { IsNumber, IsString } from 'class-validator'

export class LaunchCreateDto {

    @IsNumber()
    pipeline!: string;

    @IsNumber()
    job!: string;

    @IsString()
    srcBranch!: string

    @IsString()
    dstBranch!: string 

    @IsString()
    image!: string
}