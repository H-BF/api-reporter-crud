import { Assertions as PAssertions } from "@prisma/client"
import { AssertionsCreateDto } from "./dto/assertions.create.dto";
import { IAssertionsService } from "./interfaces/assertions.service.interface";
import { AssertionsRepository } from "./assertions.repository";
import { Assertions } from "./assertions.entity";

export class AssertionsService implements IAssertionsService {

    constructor(private client: AssertionsRepository) {}

    async create(dto: AssertionsCreateDto): Promise<string> {
        const assertion = new Assertions(
            dto.name,
            dto.executionUuid,
            dto.jsonSchema || null,
            dto.errorMessage || null,
            dto.status
        )
        const { uuid } = await this.client.create(assertion)
        return uuid
    }

    async createMany(dto: AssertionsCreateDto[]): Promise<number> {
        let data: Assertions[] = []
        dto.forEach(d => {
            data = data.concat(new Assertions(
                d.name,
                d.executionUuid,
                d.jsonSchema || null,
                d.errorMessage || null,
                d.status
            ))
        })
        return await this.client.createMany(data)
    }

    async getOneByUuid(uuid: string): Promise<PAssertions | null> {
        return await this.client.getOneByUuid(uuid)
    }

    async getAllByExecutionUuid(executionUuid: string): Promise<PAssertions[] | null> {
        return await this.client.getAllByExecutionUuid(executionUuid)
    }
}