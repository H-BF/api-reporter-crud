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
import { ExecutionUpdateDto } from "./dto/executions.update.dto";

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
                method: 'patch',
                func: this.update,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(ExecutionUpdateDto)]
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

    @tryCatch("не удалось обновить Execution")
    async update(req: Request, res: Response, next: NextFunction) {
        const execution = await this.executionsService.update(req.body)
        res.status(200).send(execution)
    }

    @tryCatch("не удалось получить данные по Execution")
    async getByUuid(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['uuid']!!.toString()
        const execution = await this.executionsService.getByUuid(uuid)
        res.status(200).send(execution)
    }

    @tryCatch("не удалось получить данные по всем Execution")
    async getAllByLaunchUuid(req: Request, res: Response, next: NextFunction) {
        const queryParam = req.query as unknown as ExecutionsFindAllByLaunchUuidDto
        const executions = await this.executionsService.getAllByLaunchUuid(queryParam)
        res.status(200).send(executions)
    }
}