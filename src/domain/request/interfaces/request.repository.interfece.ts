import { Request as PRequest } from '@prisma/client'
import { Request } from '../request.entity'

export interface IRequestRepository {
    create(request: Request): Promise<PRequest>
    getByUuid(uuid: string): Promise<PRequest | null>
}