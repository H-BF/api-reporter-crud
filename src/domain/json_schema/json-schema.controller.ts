import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { JsonSchemaService } from "./json-schema.service";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { JsonSchemaCreateDto } from "./dto/json-schema.create.dto";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { tryCatch } from "../../common/decorator/controller.try-catch.decorator";
import { JsonSchemaFindDto } from "./dto/json-schema.find.dto";
import { JsonSchemaFindAllByLaunchUuidDto } from "./dto/json-schema.find-many-by-launch-uuid.dto";

export class JsonSchemaController extends BaseController {
 
    constructor(
        private jsonSchemaService: JsonSchemaService
    ) {
        super()
        this.bindRouts([
            {
                path: '/json_schema',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(JsonSchemaCreateDto)]
            },
            {
                path: '/json_schema',
                method: 'get',
                func: this.getOneByUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(JsonSchemaFindDto)]
            },
            {
                path: '/json_schemas',
                method: 'get',
                func: this.getManyByLaunchUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(JsonSchemaFindAllByLaunchUuidDto)]
            }
        ])
    }

    @tryCatch("не удалось создать JsonSchema")
    async create(req: Request, res: Response, next: NextFunction) {
        const uuid = await this.jsonSchemaService.createNewJsonSchema(req.body)
        res.status(201).send({ "uuid": uuid })
    } 

    @tryCatch("не удалось получить данные по JsonSchema")
    async getOneByUuid(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['uuid']!!.toString()
        const jsonSchema = await this.jsonSchemaService.getJsonSchemaByUuid(uuid)
        res.status(200).send(jsonSchema)
    } 

    @tryCatch("не удалось получить данные по всем JsonSchema")
    async getManyByLaunchUuid(req: Request, res: Response, next: NextFunction) {
        const launchUuid = req.query['launchUuid']!!.toString()
        const jsonSchema = await this.jsonSchemaService.getAllJsonSchemasByLaunchUuid(launchUuid)
        res.status(200).send(jsonSchema)
    } 
}