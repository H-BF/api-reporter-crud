import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller"
import { AssertionsService } from "./assertions.service";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { PostArrayValidateMiddleware } from "../../common/middleware/post-array.validate.middleware";
import { AssertionsCreateDto } from "./dto/assertions.create.dto";
import { AssertionsFindAllByExecUuidDto } from "./dto/assertions.find-all-by-exec-uuid.dto";
import { AssertionsFindDto } from "./dto/assertions.find";
import { tryCatch } from "../../common/decorator/controller.try-catch.decorator";

export class AssertionsController extends BaseController {

    constructor(private assertionsService: AssertionsService) {
        super()
        this.bindRouts([
            {
                path: '/assertion',
                method: 'get',
                func: this.getOneByUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(AssertionsFindDto)]
            },
            {
                path: '/assertion',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(AssertionsCreateDto)]
            },
            {
                path: '/assertions',
                method: 'get',
                func: this.getAllByExecutionUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(AssertionsFindAllByExecUuidDto)]
            },            {
                path: '/assertions',
                method: 'post',
                func: this.createMany,
                middlewares: [controllerMethodLogger, new PostArrayValidateMiddleware(AssertionsCreateDto)]
            }
        ])
    }

    @tryCatch("не удалось создать Assertion")
    async create(req: Request, res: Response, next: NextFunction) {
        const uuid = await this.assertionsService.create(req.body)
        res.status(201).send({ "uuid": uuid })
    }

    @tryCatch("не удалось создать несколько Assertions")
    async createMany(req: Request, res: Response, next: NextFunction) {
        const count = await this.assertionsService.createMany(req.body)
        res.status(201).send({ "count": count })
    }

    @tryCatch("не удалось получить данные по Assertion")
    async getOneByUuid(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['uuid']!!.toString()
        const assertion = await this.assertionsService.getOneByUuid(uuid)
        res.status(200).send(assertion)
    }

    @tryCatch("не удалось получить данные по всем Assertions")
    async getAllByExecutionUuid(req: Request, res: Response, next: NextFunction) {
        const execUuid = req.query['executionUuid']!!.toString()
        const assertions = await this.assertionsService.getAllByExecutionUuid(execUuid)
        res.status(200).send(assertions)
    }
} 
