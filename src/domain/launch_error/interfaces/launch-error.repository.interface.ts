import { LaunchError } from "@prisma/client";
import { ILaunchError } from "../launch-error.entity";

export interface ILaunchErrorRepository {
    create(launchError: ILaunchError): Promise<LaunchError>
    getByLaunchUuid(uuid: string): Promise<LaunchError | null>
    getAll(): Promise<LaunchError[] | null>
}