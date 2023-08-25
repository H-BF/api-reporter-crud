import { LaunchError as PLaunchError } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { ILaunchErrorRepository } from "./interfaces/launch-error.repository.interface";
import { ILaunchError } from "./launch-error.entity";

export class LaunchErrorRepository implements ILaunchErrorRepository {

    constructor(private prismaService: PrismaService) { }

    async create(launchError: ILaunchError): Promise<PLaunchError> {
        return await this.prismaService.client.launchError.create({
            data: {
                launch_uuid: launchError.launchUUID,
                message: launchError.message
            }
        })
    }

    async getByLaunchUuid(launchUuid: string): Promise<PLaunchError | null> {
        return await this.prismaService.client.launchError.findFirst({
            where: {
                launch_uuid: launchUuid
            }
        })
    }

    async getAll(): Promise<PLaunchError[] | null> {
        return await this.prismaService.client.launchError.findMany()
    }
}