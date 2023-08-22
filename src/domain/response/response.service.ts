import { ResponseCreateDto } from "./dto/response.create.dto";
import { IResponseService } from "./interfaces/response.service.interface";
import { Response as PResponse } from '@prisma/client'
import { ResponseRepository } from "./response.repository";
import { Response } from './response.entity'

export class ResponseService implements IResponseService {

    constructor(private client: ResponseRepository) {}

    async create({status, code, header, body}: ResponseCreateDto): Promise<string> {
        const response = new Response(status, code, header, body)
        const { uuid } = await this.client.create(response)
        return uuid
    }
    
    async getByUuid(uuid: string): Promise<PResponse | null> {
        return await this.client.getByUuid(uuid)
    }
}