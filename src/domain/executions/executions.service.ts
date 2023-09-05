import { ExecutionsCreateDto } from "./dto/executions.create.dto";
import { ExecutionsFindAllByLaunchUuidDto } from "./dto/executions.find-all-by-launch-uuid.dto";
import { ExecutionUpdateDto } from "./dto/executions.update.dto";
import { Executions } from "./executions.entity";
import { ExecutionsRepository } from "./executions.repository";
import { IExecutionsService } from "./interfaces/executions.service.interface";
import { Executions as PExecutions } from "@prisma/client"

export class ExecutionsService implements IExecutionsService {
    
    constructor(private client: ExecutionsRepository) {}

    async create(dto: ExecutionsCreateDto): Promise<string> {
        const execution = new Executions(dto)
        const { uuid } = await this.client.create(execution)
        return uuid
    }

    async update(dto: ExecutionUpdateDto): Promise<PExecutions> {
        const {uuid, ...data} = dto
        return await this.client.update(uuid, new Executions(data))
    }

    async getByUuid(uuid: string): Promise<PExecutions | null> {
        return await this.client.getOneByUuid(uuid)
    }
    
    async getAllByLaunchUuid(dto: ExecutionsFindAllByLaunchUuidDto): Promise<{totalRows: number, executions: PExecutions[] | []}> {
        const totalRows = await this.client.countAllRowsWhere(dto.launchUuid)
        const executions = await this.client.getAllByLaunchUuid(dto.launchUuid, dto.offset, dto.limit)
        return {
            totalRows: totalRows,
            executions: executions || []
        }
    }
}