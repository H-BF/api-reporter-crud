import { Executions as PExecutions, PrismaClient } from "@prisma/client";
import { Executions } from "./executions.entity";
import { IExecutionsRepository } from "./interfaces/executions.repository.interface";
import { PrismaService } from "../../database/prisma.service";

export class ExecutionsRepository implements IExecutionsRepository {

    constructor(private prismaService: PrismaService) { }

    async create(execution: Executions): Promise<PExecutions> {
        const data = this.transform(execution)
        return await this.prismaService.client.executions.create({
            data: data
        })
    }

    async update(uuid: string, execution: Executions): Promise<PExecutions> {
        const data = this.transform(execution)
        return await this.prismaService.client.executions.update({
            data: data,
            where: {
                uuid: uuid
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

    private transform(execution: Executions): any {
        let result: any = {}
        if (execution.name) { result.name = execution.name }
        if (execution.launchUuid) { result.launch_uuid = execution.launchUuid }
        if (execution.requestUuid) { result.request_uuid = execution.requestUuid }
        if (execution.responseUuid) { result.response_uuid = execution.responseUuid }
        if (execution.failCount != null || undefined) { result.fail_count = execution.failCount }
        if (execution.passCount != null || undefined) { result.pass_count = execution.passCount }
        return result
    }
}