import { Assertions as PAssertions, PrismaClient } from "@prisma/client";
import { IAssertionsRepository } from "./interfaces/assertions.repository.interface";
import { Assertions } from "./assertions.entity";
import { PrismaService } from "../../database/prisma.service";

export class AssertionsRepository implements IAssertionsRepository {

    constructor(private prismaService: PrismaService) {}

    async create(assertions: Assertions): Promise<PAssertions> {
        return await this.prismaService.client.assertions.create({
            data: {
               name: assertions.name,
               execution_uuid: assertions.executionUuid,
               error_message: assertions.errorMessage,
               status: assertions.status 
            }
        })
    }

    async createMany(assertions: Assertions[]): Promise<number> {
        const data: any[] = []

        assertions.forEach(assertion => {
            data.push({
                name: assertion.name,
                execution_uuid: assertion.executionUuid,
                error_message: assertion.errorMessage,
                status: assertion.status 
            });
        })

        const { count } = await this.prismaService.client.assertions.createMany({
            data: data
        })
        return count
    }

    async getOneByUuid(uuid: string): Promise<PAssertions | null> {
        return await this.prismaService.client.assertions.findFirst({
            where: {
                uuid: uuid
            }
        })
    }

    async getAllByExecutionUuid(executionUuid: string): Promise<PAssertions[] | null> {
        return await this.prismaService.client.assertions.findMany({
            where: {
                execution_uuid: executionUuid
            }
        })
    }
}