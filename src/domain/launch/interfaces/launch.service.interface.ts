import { Launch as PLaunch } from "@prisma/client"
import { LaunchCreateDto } from "../dto/launch.create.dto"
import { LaunchUpdateDto } from "../dto/launch.update.dto"

export interface ILaunchService {
    createNewLaunch(dto: LaunchCreateDto): Promise<string>
    updateLaunch(dto: LaunchUpdateDto): Promise<PLaunch>
    getLaunchByUuid(uuid: string): Promise<PLaunch | null>
    getAllLaunchs(): Promise<PLaunch[] | null> 
}