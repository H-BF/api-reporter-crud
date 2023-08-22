import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { tryCatch } from "../../common/decorator/controller.try-catch.decorator";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { ResponseCreateDto } from "./dto/response.create.dto";
import { ResponseFindDto } from "./dto/response.find.dto";
import { ResponseService } from "./response.service";

export class ResponseController extends BaseController {

    constructor(private responseService: ResponseService) {
        super()
        this.bindRouts([
            {
                path: '/response',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(ResponseCreateDto)] 
            },
            {
                path: '/response',
                method: 'get',
                func: this.getOneByUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(ResponseFindDto)]
            }
        ])
    }

    @tryCatch("не удалось создать Response")
    async create(req: Request, res: Response, next: NextFunction) {
        const uuid = await this.responseService.create(req.body)
        res.status(201).send({ "uuid": uuid })
    }

    @tryCatch("не удалось получить данные по Response")
    async getOneByUuid(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['uuid']!!.toString()
        const request = await this.responseService.getByUuid(uuid)
        res.status(200).send(request)  
    }
}