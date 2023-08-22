import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { tryCatch } from "../../common/decorator/controller.try-catch.decorator";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { ExecutionsCreateDto } from "./dto/executions.create.dto";
import { ExecutionsFindAllByLaunchUuidDto } from "./dto/executions.find-all-by-launch-uuid.dto";
import { ExecutionsFindDto } from "./dto/executions.find.dto";
import { ExecutionsService } from "./executions.service";

export class ExecutionsController extends BaseController {

    constructor(
        private executionsService: ExecutionsService
    ) {
        super()
        this.bindRouts([
            {
                path: '/execution',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(ExecutionsCreateDto)]
            },
            {
                path: '/execution',
                method: 'get',
                func: this.getByUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(ExecutionsFindDto)]
            },
            {
                path: '/executions',
                method: 'get',
                func: this.getAllByLaunchUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(ExecutionsFindAllByLaunchUuidDto)]
            }
        ])
    }

    @tryCatch("не удалось создать Execution")
    async create(req: Request, res: Response, next: NextFunction) {
        const uuid = await this.executionsService.create(req.body)
        res.status(201).send({ "uuid": uuid })
    }

    @tryCatch("не удалось получить данные по Execution")
    async getByUuid(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['uuid']!!.toString()
        const execution = await this.executionsService.getByUuid(uuid)
        res.status(200).send(execution)
    }

    @tryCatch("не удалось получить данные по всем Execution")
    async getAllByLaunchUuid(req: Request, res: Response, next: NextFunction) {
        const launchUuid = req.query['launchUuid']!!.toString()
        const executions = await this.executionsService.getAllByLaunchUuid(launchUuid)
        res.status(200).send(executions)
    }
}