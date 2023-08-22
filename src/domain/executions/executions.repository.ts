import { Executions as PExecutions, PrismaClient } from "@prisma/client";
import { Executions  } from "./executions.entity";
import { IExecutionsRepository } from "./interfaces/executions.repository.interface";
import { PrismaService } from "../../database/prisma.service";

export class ExecutionsRepository implements IExecutionsRepository {

    constructor(private prismaService: PrismaService) {}

    async create(execution: Executions): Promise<PExecutions> {
        return await this.prismaService.client.executions.create({
            data: {
                name: execution.name,
                launch_uuid: execution.launchUuid,
                request_uuid: execution.requestUuid,
                response_uuid: execution.responseUuid
            }
        })
    }

    async getOneByUuid(uuid: string): Promise<PExecutions | null> {
        return await this.prismaService.client.executions.findFirst({
            where: {
                uuid: uuid
            }
        })
    }

    async getAllByLaunchUuid(launchUuid: string): Promise<PExecutions[] | null> {
        return await this.prismaService.client.executions.findMany({
            where: {
                launch_uuid: launchUuid
            }
        })
    }
}