import { IRequestRepository } from "./interfaces/request.repository.interfece";
import { Request as PRequest } from '@prisma/client'
import { Request } from './request.entity'
import { PrismaService } from "../../database/prisma.service";

export class RequestRepository implements IRequestRepository {

    constructor(private prismaService: PrismaService) {}

    async create(request: Request): Promise<PRequest> {
        return await this.prismaService.client.request.create({
            data: {
                method: request.method,
                url: request.url,
                header: request.header,
                body: request.body
            }
        })
    }

    async getByUuid(uuid: string): Promise<PRequest | null> {
        return await this.prismaService.client.request.findFirst({
            where: {
                uuid: uuid
            }
        })
    }
}