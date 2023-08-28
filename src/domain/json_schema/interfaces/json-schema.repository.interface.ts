import { JsonSchema as PJsonSchema} from "@prisma/client"
import { JsonSchema } from "../json-schema.entity"

export interface IJsonSchemaRepository {
    create(jsonSchema: JsonSchema): Promise<PJsonSchema>
    getOneByUuid(uuid: string): Promise<PJsonSchema | null>
    getAllByLaunchUuid(launchUuid: string): Promise<PJsonSchema[] | null>
}