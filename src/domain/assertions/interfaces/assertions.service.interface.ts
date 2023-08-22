import { Assertions as PAssertions } from "@prisma/client"
import { AssertionsCreateDto } from "../dto/assertions.create.dto"

export interface IAssertionsService {
    create(dto: AssertionsCreateDto): Promise<string>
    createMany(dto: AssertionsCreateDto[]): Promise<number>
    getOneByUuid(uuid: string): Promise<PAssertions | null>
    getAllByExecutionUuid(executionUuid: string): Promise<PAssertions[] | null>
}