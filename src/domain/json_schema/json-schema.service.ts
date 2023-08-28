import { JsonSchema as PJsonSchema} from "@prisma/client"
import { IJsonSchemaService } from "./interfaces/json-schema.service.interface"
import { JsonSchemaCreateDto } from "./dto/json-schema.create.dto"
import { JsonSchemaRepository } from "./json-schema.repository"
import { JsonSchema } from "./json-schema.entity"

export class JsonSchemaService implements IJsonSchemaService {

    constructor(private client: JsonSchemaRepository) {}

    async createNewJsonSchema(dto: JsonSchemaCreateDto): Promise<string> {
        const jsonSchema = new JsonSchema(dto)
        const res = await this.client.create(jsonSchema)
        return res.uuid
    }

    async getJsonSchemaByUuid(uuid: string): Promise<PJsonSchema | null> {
        return await this.client.getOneByUuid(uuid)
    }

    async getAllJsonSchemasByLaunchUuid(launchUuid: string): Promise<PJsonSchema[] | null> {
        return await this.client.getAllByLaunchUuid(launchUuid)
    }
}