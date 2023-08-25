import { LaunchError as PLaunchError } from "@prisma/client";
import { LaunchErrorCreateDto } from "./dto/launch-error.create.dto";
import { ILaunchErrorService } from "./interfaces/launch-error.service.interface";
import { LaunchErrorRepository } from "./launch-error.repository";
import { LaunchError } from "./launch-error.entity";

export class LaunchErrorService implements ILaunchErrorService {

    constructor(private client: LaunchErrorRepository) { }

    async create(dto: LaunchErrorCreateDto): Promise<void> {
        const launchError = new LaunchError({
            launchUUID: dto.launch_uuid,
            message: dto.message
        })
        await this.client.create(launchError)
    }

    async getByLaunchUUID(launchUuid: string): Promise<PLaunchError | null> {
        return await this.client.getByLaunchUuid(launchUuid)
    }

    async getAll(): Promise<PLaunchError[] | null> {
        return await this.client.getAll()
    }
}