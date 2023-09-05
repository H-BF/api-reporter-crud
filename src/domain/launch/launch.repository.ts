import { ILaunchRepository } from "./interfaces/launch.repository.interface";
import { Launch } from "./launch.entity";
import { Launch as PLaunch } from "@prisma/client"
import { PrismaService } from '../../database/prisma.service';

export class LaunchRepository implements ILaunchRepository {

    constructor(private prismaService: PrismaService) { }

    async create(launch: Launch): Promise<PLaunch> {
        return await this.prismaService.client.launch.create({
            data: {
                pipeline: Number(launch.pipeline),
                job: Number(launch.job),
                src_branch: launch.srcBranch!,
                dst_branch: launch.dstBranch!,
                commit: launch.commit!,
                fail_count: launch.failCount,
                pass_count: launch.passCount,
                duration: launch.duration,
                hbf_tag: launch.hbfTag!,
                status: launch.status,

            }
        })
    }

    async updateByUuid(uuid: string, launch: Launch): Promise<PLaunch> {
        let data: any = this.transform(launch)
        return await this.prismaService.client.launch.update({
            data: data,
            where: {
                uuid: uuid
            }
        })
    }

    async getByUuid(uuid: string): Promise<PLaunch | null> {
        return await this.prismaService.client.launch.findFirst({
            where: {
                uuid: uuid
            }
        })
    }
    
    async getLaunchsWhere(
        launch: Launch,
        offset?: number,
        limit?: number
    ): Promise<PLaunch[] | null> {
        let where: any = this.transform(launch)
        return await this.prismaService.client.launch.findMany({
            where: where,
            skip: Number(offset) || undefined,
            take: Number(limit) || undefined
        })
    }

    async countAllRowsWhere(launch: Launch): Promise<number> {
        let where: any = this.transform(launch)
        return await this.prismaService.client.launch.count({
            where: where
        })
    }

    private transform(launch: Launch): any {
        let result: any = {}
        if (launch.pipeline) { result.pipeline = Number(launch.pipeline) }
        if (launch.job) { result.job = Number(launch.job) }
        if (launch.srcBranch) { result.src_branch = launch.srcBranch }
        if (launch.dstBranch) { result.dst_branch = launch.dstBranch }
        if (launch.commit) { result.commit = launch.commit }
        if (launch.failCount) { result.fail_count = launch.failCount }
        if (launch.passCount) { result.pass_count = launch.passCount }
        if (launch.duration) { result.duration = launch.duration }
        if (launch.hbfTag) { result.hbf_tag = launch.hbfTag }
        if (launch.status) { result.status = launch.status }
        return result
    }
} 