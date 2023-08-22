import { Assertions } from "../assertions.entity";
import { Assertions as PAssertions } from "@prisma/client"

export interface IAssertionsRepository {
    create(assertions: Assertions): Promise<PAssertions>
    createMany(assertions: Assertions[]): Promise<number>
    getOneByUuid(uuid: string): Promise<PAssertions | null>
    getAllByExecutionUuid(executionUuid: string): Promise<PAssertions[] | null>
}