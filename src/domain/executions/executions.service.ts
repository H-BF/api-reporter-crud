import { ExecutionsCreateDto } from "./dto/executions.create.dto";
import { Executions } from "./executions.entity";
import { ExecutionsRepository } from "./executions.repository";
import { IExecutionsService } from "./interfaces/executions.service.interface";
import { Executions as PExecutions } from "@prisma/client"

export class ExecutionsService implements IExecutionsService {
    
    constructor(private client: ExecutionsRepository) {}

    async create({ name, launchUuid, requestUuid, responseUuid }: ExecutionsCreateDto): Promise<string> {
        const execution = new Executions(name, launchUuid, requestUuid, responseUuid)
        const { uuid } = await this.client.create(execution)
        return uuid
    }

    async getByUuid(uuid: string): Promise<PExecutions | null> {
        return await this.client.getOneByUuid(uuid)
    }
    
    async getAllByLaunchUuid(launchUuid: string): Promise<PExecutions[] | null> {
        return await this.client.getAllByLaunchUuid(launchUuid)
    }
}