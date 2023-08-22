import { Executions as PExecutions } from "@prisma/client";
import { Executions } from "../executions.entity";

export interface IExecutionsRepository {
    create(execution: Executions): Promise<PExecutions>
    getOneByUuid(uuid: string): Promise<PExecutions | null>
    getAllByLaunchUuid(uuid: string): Promise<PExecutions[] | null>
}