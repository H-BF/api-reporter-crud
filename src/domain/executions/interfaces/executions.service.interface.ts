import { Executions as PExecutions } from "@prisma/client"
import { ExecutionsCreateDto } from "../dto/executions.create.dto"

export interface IExecutionsService {
    create(dto: ExecutionsCreateDto): Promise<string>
    getByUuid(uuid: string): Promise<PExecutions | null>
    getAllByLaunchUuid(launchUuid: string): Promise<PExecutions[] | null>
}