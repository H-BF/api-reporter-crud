import { Launch } from "../launch.entity";
import { Launch as PLaunch } from "@prisma/client"

export interface ILaunchRepository {
    create(launch: Launch): Promise<PLaunch>
    updateByUuid(uuid: string, launch: Launch): Promise<PLaunch>
    getByUuid(uuid: string): Promise<PLaunch | null>
    getLaunchsWhere(launch: Launch): Promise<PLaunch[] | null>
    countAllRowsWhere(launch: Launch): Promise<number>
}