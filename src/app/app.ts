import bodyParser from "body-parser"
import express, { Application } from "express"
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import { PrismaService } from "../database/prisma.service"
import { ExceptionFilter } from "../errors/exception.filter"
import { LaunchRepository } from "../domain/launch/launch.repository"
import { LaunchService } from "../domain/launch/launch.service"
import { LaunchController } from "../domain/launch/launch.controller"
import { LaunchErrorRepository } from "../domain/launch_error/launch-error.repository"
import { LaunchErrorService } from "../domain/launch_error/launch-error.service"
import { LaunchErrorController } from "../domain/launch_error/launch-error.controller"
import { RequestRepository } from "../domain/request/request.repository"
import { RequestService } from "../domain/request/request.service"
import { RequestController } from "../domain/request/request.controller"
import { ResponseRepository } from "../domain/response/response.repository"
import { ResponseService } from "../domain/response/response.service"
import { ResponseController } from "../domain/response/response.controller"
import { ExecutionsRepository } from "../domain/executions/executions.repository"
import { ExecutionsService } from "../domain/executions/executions.service"
import { ExecutionsController } from "../domain/executions/executions.controller"
import { AssertionsRepository } from "../domain/assertions/assertions.repository"
import { AssertionsService } from "../domain/assertions/assertions.service"
import { AssertionsController } from "../domain/assertions/assertions.controller"
import { swaggerTemplate } from '../swagger.template'
import { variables } from "../common/var_storage/variables-storage";

export class App {

    private app: Application

    constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
    }

    async start(): Promise<Application> {

        const client = new PrismaService()
        await client.connect()

        //Инициализируеми репозитории
        const launchRepo = new LaunchRepository(client)
        const launchErrRepo = new LaunchErrorRepository(client)
        const reqRepo = new RequestRepository(client)
        const resRepo = new ResponseRepository(client)
        const execRepo = new ExecutionsRepository(client)
        const assertionRepo = new AssertionsRepository(client)

        //Инициализируем сервисы
        const launchSvc = new LaunchService(launchRepo)
        const launchErrSvc = new LaunchErrorService(launchErrRepo)
        const reqSvc = new RequestService(reqRepo)
        const resSvc = new ResponseService(resRepo)
        const execSvc = new ExecutionsService(execRepo)
        const assertionSvc = new AssertionsService(assertionRepo)

        //Инициализируем и привязываем контроллеры
        this.app.use('/api/v1', new LaunchController(launchSvc).router)
        this.app.use('/api/v1', new LaunchErrorController(launchErrSvc).router)
        this.app.use('/api/v1', new RequestController(reqSvc).router)
        this.app.use('/api/v1', new ResponseController(resSvc).router)
        this.app.use('/api/v1', new ExecutionsController(execSvc).router)
        this.app.use('/api/v1', new AssertionsController(assertionSvc).router)

        //Биндим обработчик ошибок
        const exf = new ExceptionFilter()
        this.app.use(exf.catch.bind(exf))

        if(variables.get("STAGE") === "dev") {
            this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerTemplate({
                host: variables.get("INGRESS_NAME"),
                port: variables.get("INGRESS_PORT")
            }) as unknown as JsonObject))
        }

        return this.app
    }
}
