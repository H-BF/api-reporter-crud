import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { LaunchCreateDto } from "./dto/launch.create.dto";
import { LaunchFindDto } from "./dto/launch.find.dto";
import { LaunchUpdateDto } from "./dto/launch.update.dto";
import { LaunchService } from "./launch.service";
import { tryCatch } from "../../common/decorator/controller.try-catch.decorator";
import { LaunchFindWhereDto } from "./dto/launch.find.where.dto";
import { EmptyDto } from "./dto/empty.dto";

export class LaunchController extends BaseController {

    constructor(private launchServise: LaunchService) {
        super()
        this.bindRouts([
            {
                path: '/launch',
                method: 'get',
                func: this.getOneByUuid,
                middlewares: [controllerMethodLogger,  new GetValidateMiddleware(LaunchFindDto)]
                
            },
            {
                path: '/launch',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(LaunchCreateDto)]
            },
            {
                path: '/launch',
                method: 'patch',
                func: this.update,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(LaunchUpdateDto)]
            },
            {
                path: '/launchs',
                method: 'get',
                func: this.getWhere,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(LaunchFindWhereDto)]
            },
            {
                path: '/launchs/unique_service',
                method: 'get',
                func: this.getUniqueServiceName,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(EmptyDto)]
            }
        ])
    }

    @tryCatch("не удалось создать Launch")
    async create(req: Request, res: Response, next: NextFunction) {
            const uuid = await this.launchServise.createNewLaunch(req.body)
            res.status(201).send({ "uuid": uuid })
    }

    @tryCatch("не удалось обновить Launch")
    async update(req: Request, res: Response, next: NextFunction) {
        const launch = await this.launchServise.updateLaunch(req.body)
        res.status(200).send(launch)
    }

    @tryCatch("не удалось получить данные по всем launch")
    async getWhere(req: Request, res: Response, next: NextFunction) {
        const launchs = await this.launchServise.getLaunchsWhere(req.query)
        res.status(200).send(launchs)
    }
       
    @tryCatch("не удалось получить данные по launch")
    async getOneByUuid(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['uuid']!!.toString()
        const launch = await this.launchServise.getLaunchByUuid(uuid)
        res.status(200).send(launch)
    }

    async getUniqueServiceName(req: Request, res: Response, next: NextFunction) {
        const serviceName = await this.launchServise.getUniqueServiceName()
        res.status(200).send(serviceName)
    }
}