import { RequestCreateDto } from "./dto/request.create.dto";
import { IRequestService } from "./interfaces/request.service.interface";
import { RequestRepository } from "./request.repository";
import { Request as PRequest } from '@prisma/client'
import { Request } from './request.entity'

export class RequestService implements IRequestService {

    constructor(private client: RequestRepository) { }

    async create({method, url, header, body}: RequestCreateDto): Promise<string> {
        const request = new Request(method, url, header, body)
        const { uuid } = await this.client.create(request)
        return uuid
    }

    async getByUuid(uuid: string): Promise<PRequest | null > {
        return await this.client.getByUuid(uuid)
    }
}