import { Executions as PExecutions, PrismaClient } from "@prisma/client";
import { Executions } from "./executions.entity";
import { IExecutionsRepository } from "./interfaces/executions.repository.interface";
import { PrismaService } from "../../database/prisma.service";
import { retry } from "../../common/decorator/repository.retry.decorator";

export class ExecutionsRepository implements IExecutionsRepository {

    constructor(private prismaService: PrismaService) { }

    @retry()
    async create(execution: Executions): Promise<PExecutions> {
        const data = this.transform(execution)
        return await this.prismaService.client.executions.create({
            data: data
        })
    }

    @retry()
    async update(uuid: string, execution: Executions): Promise<PExecutions> {
        const data = this.transform(execution)
        return await this.prismaService.client.executions.update({
            data: data,
            where: {
                uuid: uuid
            }
        })
    }

    @retry()
    async getOneByUuid(uuid: string): Promise<PExecutions | null> {
        return await this.prismaService.client.executions.findFirst({
            where: {
                uuid: uuid
            }
        })
    }

    @retry()
    async getAllByLaunchUuid(
        launchUuid: string,
        offset?: number,
        limit?: number
    ): Promise<PExecutions[] | null> {
        return await this.prismaService.client.executions.findMany({
            where: {
                launch_uuid: launchUuid
            },
            skip: Number(offset) || undefined,
            take: Number(limit) || undefined
        })
    }

    @retry()
    async countAllRowsWhere(launchUuid: string): Promise<number> {
        return this.prismaService.client.executions.count({
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