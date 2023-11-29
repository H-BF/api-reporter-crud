import { IJsonSchemaRepository } from "./interfaces/json-schema.repository.interface";
import { PrismaService } from "../../database/prisma.service";
import { JsonSchema as PJsonSchema} from "@prisma/client"
import { JsonSchema } from "./json-schema.entity";
import { retry } from "../../common/decorator/repository.retry.decorator";

export class JsonSchemaRepository implements IJsonSchemaRepository {

    constructor(private prismaService: PrismaService) { }

    @retry()
    async create(jsonSchema: JsonSchema): Promise<PJsonSchema> {
       return await this.prismaService.client.jsonSchema.create({
        data: {
            name: jsonSchema.name,
            launch_uuid: jsonSchema.launchUuid,
            json_schema: JSON.parse(jsonSchema.schema)
        }
       })
    }

    @retry()
    async getOneByUuid(uuid: string): Promise<PJsonSchema | null> {
        return await this.prismaService.client.jsonSchema.findFirst({
            where: {
                uuid: uuid
            }
        })
    }

    @retry()
    async getAllByLaunchUuid(launchUuid: string): Promise<PJsonSchema[] | null> {
        return await this.prismaService.client.jsonSchema.findMany({
            where: {
                launch_uuid: launchUuid
            }
        })
    }
}