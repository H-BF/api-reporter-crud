import { JsonSchema as PJsonSchema} from "@prisma/client"
import { JsonSchemaCreateDto } from "../dto/json-schema.create.dto"

export interface IJsonSchemaService {
    createNewJsonSchema(dto: JsonSchemaCreateDto): Promise<string>
    getJsonSchemaByUuid(uuid: string): Promise<PJsonSchema | null>
    getAllJsonSchemasByLaunchUuid(launchUuid: string): Promise<PJsonSchema[] | null>
}