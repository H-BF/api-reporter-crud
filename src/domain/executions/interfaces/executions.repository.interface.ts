import { Executions as PExecutions } from "@prisma/client";
import { Executions } from "../executions.entity";

export interface IExecutionsRepository {
    create(execution: Executions): Promise<PExecutions>
    update(uuid: string, execution: Executions): Promise<PExecutions>
    getOneByUuid(uuid: string): Promise<PExecutions | null>
    getAllByLaunchUuid(launchUuid: string, offset: number, limit: number): Promise<PExecutions[] | null>
    countAllRowsWhere(launchUuid: string): Promise<number>
}