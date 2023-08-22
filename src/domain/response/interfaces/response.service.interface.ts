import { Response as PResponse } from '@prisma/client'
import { ResponseCreateDto } from '../dto/response.create.dto'

export interface IResponseService {
    create(dto: ResponseCreateDto): Promise<string>
    getByUuid(uuid: string): Promise<PResponse | null>
}