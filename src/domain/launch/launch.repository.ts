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
                fail_count: launch.failCount,
                pass_count: launch.passCount,
                duration: launch.duration,
                image: launch.image!,
                status: launch.status,

            }
        })
    }

    async updateByUuid(uuid: string, launch: Launch): Promise<PLaunch> {
        let data: any = {}

        if (launch.pipeline) { data.pipeline = launch.pipeline }
        if (launch.job) { data.job = launch.job }
        if (launch.srcBranch) { data.src_branch = launch.srcBranch }
        if (launch.dstBranch) { data.dst_branch = launch.dstBranch }
        if (launch.failCount) { data.fail_count = launch.failCount }
        if (launch.passCount) { data.pass_count = launch.passCount }
        if (launch.duration) { data.duration = launch.duration }
        if (launch.image) { data.image = launch.image }
        if (launch.status) { data.status = launch.status }

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

    async getAll(): Promise<PLaunch[] | null> {
        return await this.prismaService.client.launch.findMany()
    }
} 