import { Executions as PExecutions } from "@prisma/client"
import { ExecutionsCreateDto } from "../dto/executions.create.dto"
import { ExecutionUpdateDto } from "../dto/executions.update.dto"
import { ExecutionsFindAllByLaunchUuidDto } from "../dto/executions.find-all-by-launch-uuid.dto"

export interface IExecutionsService {
    create(dto: ExecutionsCreateDto): Promise<string>
    update(dto: ExecutionUpdateDto): Promise<PExecutions>
    getByUuid(uuid: string): Promise<PExecutions | null>
    getAllByLaunchUuid(dto: ExecutionsFindAllByLaunchUuidDto): Promise<{totalRows: number, executions: PExecutions[] | []}>
}