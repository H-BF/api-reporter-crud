import { IsEmpty } from "class-validator";

export class EmptyDto {
    @IsEmpty({ message: "No query parameters are allowed" })
    param?: string;
}