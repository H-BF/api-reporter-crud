import { Response as PResponse } from '@prisma/client'
import { Response } from '../response.entity'

export interface IResponseRepository {
    create(response: Response): Promise<PResponse>
    getByUuid(uuid: string): Promise<PResponse | null>
}