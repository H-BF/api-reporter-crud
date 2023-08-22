import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { RequestCreateDto } from "./dto/request.create.dto";
import { RequestFindDto } from "./dto/request.find.dto";
import { RequestService } from "./request.service";
import { HTTPError } from "../../errors/custom/http-error";
import { tryCatch } from "../../common/decorator/controller.try-catch.decorator";

export class RequestController extends BaseController {

    constructor(private requestService: RequestService) {
        super()
        this.bindRouts([
            {
                path: '/request',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(RequestCreateDto)]

            },
            {
                path: '/request',
                method: 'get',
                func: this.getOneByUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(RequestFindDto)]
            }
        ])
    }

    @tryCatch("не удалось создать Request")
    async create(req: Request, res: Response, next: NextFunction) {
        const uuid = await this.requestService.create(req.body)
        res.status(201).send({ "uuid": uuid })
    }
    
    @tryCatch("не удалось получить данные по Request")
    async getOneByUuid(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['uuid']!!.toString()
        const request = await this.requestService.getByUuid(uuid)
        res.status(200).send(request)       
    } 
}