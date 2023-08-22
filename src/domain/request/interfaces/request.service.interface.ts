import { Request as PRequest } from '@prisma/client'
import { RequestCreateDto } from '../dto/request.create.dto'

export interface IRequestService {
    create(dto: RequestCreateDto): Promise<string>
    getByUuid(uuid: string): Promise<PRequest | null>
}