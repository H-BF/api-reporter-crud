import { PrismaService } from "../../database/prisma.service";
import { Response as PResponse } from '@prisma/client'
import { Response } from './response.entity'
import { IResponseRepository } from "./interfaces/response.repository.interface";
import { retry } from "../../common/decorator/repository.retry.decorator";

export class ResponseRepository implements IResponseRepository {
    
    constructor(private prismaService: PrismaService) {}

    @retry()
    async create(response: Response): Promise<PResponse> {
        return await this.prismaService.client.response.create({
            data: {
                status: response.status,
                code: response.code,
                header: JSON.parse(response.header),
                body: JSON.parse(response.body)
                
            }
        })
    }
    
    async getByUuid(uuid: string): Promise<PResponse | null> {
        return await this.prismaService.client.response.findFirst({
            where: {
                uuid: uuid
            }
        })
    }
}