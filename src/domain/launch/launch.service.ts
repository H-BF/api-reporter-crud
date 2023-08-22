import { Launch as PLaunch } from "@prisma/client"
import { LaunchCreateDto } from "./dto/launch.create.dto";
import { LaunchUpdateDto } from "./dto/launch.update.dto";
import { ILaunchService } from "./interfaces/launch.service.interface";
import { Launch } from "./launch.entity";
import { LaunchRepository } from "./launch.repository";

export class LaunchService implements ILaunchService {

    constructor(private client: LaunchRepository) { }

    async createNewLaunch(dto: LaunchCreateDto): Promise<string> {
        const launch = new Launch(dto)
        const res = await this.client.create(launch)
        return res.uuid
    }

    async updateLaunch(dto: LaunchUpdateDto): Promise<PLaunch> {
        const {uuid, ...data} = dto
        return await this.client.updateByUuid(uuid, new Launch(data))
    }

    async getLaunchByUuid(uuid: string): Promise<PLaunch | null> {
        return await this.client.getByUuid(uuid)
    }

    async getAllLaunchs(): Promise<PLaunch[] | null> {
        return await this.client.getAll()
    } 
}