import bodyParser from "body-parser"
import cors from "cors"
import express, { Application, Request, Response, NextFunction } from "express"
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
import { JsonSchemaRepository } from "../domain/json_schema/json-schema.repository";
import { JsonSchemaService } from "../domain/json_schema/json-schema.service";
import { JsonSchemaController } from "../domain/json_schema/json-schema.controller";
import { CORSError } from "../errors/custom/cors-error";
import { NotFoundError } from "../errors/custom/not-found-error";

export class App {

    private app: Application
    private path: string

    constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
        this.path = `/${variables.get("INGRESS_PATH")}/${variables.get("API_VERSION")}`
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
        const jsonSchemaRepo = new JsonSchemaRepository(client)

        //Инициализируем сервисы
        const launchSvc = new LaunchService(launchRepo)
        const launchErrSvc = new LaunchErrorService(launchErrRepo)
        const reqSvc = new RequestService(reqRepo)
        const resSvc = new ResponseService(resRepo)
        const execSvc = new ExecutionsService(execRepo)
        const assertionSvc = new AssertionsService(assertionRepo)
        const jsonSchemaSvc = new JsonSchemaService(jsonSchemaRepo)

        //Добавлям правила для CORS
        this.app.use(cors({ origin: this.isTrustedAddress }))

        //Инициализируем и привязываем контроллеры
        this.app.use(this.path, new LaunchController(launchSvc).router)
        this.app.use(this.path, new LaunchErrorController(launchErrSvc).router)
        this.app.use(this.path, new RequestController(reqSvc).router)
        this.app.use(this.path, new ResponseController(resSvc).router)
        this.app.use(this.path, new ExecutionsController(execSvc).router)
        this.app.use(this.path, new AssertionsController(assertionSvc).router)
        this.app.use(this.path, new JsonSchemaController(jsonSchemaSvc).router)

        //Добавлям для DEV стейджа отображение swagger-документации
        if(variables.get("STAGE") === "dev") {
            this.app.use(`${this.path}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerTemplate({
                host: variables.get("INGRESS_NAME"),
                port: variables.get("INGRESS_PORT")
            }) as unknown as JsonObject))
        }

        //Обработка несуществующих path
        this.app.use(this.notFound)

        //Биндим обработчик ошибок
        const exf = new ExceptionFilter()
        this.app.use(exf.catch.bind(exf))

        return this.app
    }

    private isTrustedAddress(
        origin: string | undefined,
        cb: (err: Error | null, allow?: boolean) => void
    ) {
        const whitelist = variables.get("TRUSTED_ADDRESS").split(";")
        if (whitelist.indexOf(origin!) !== -1 || !origin) {
            cb(null, true)
        } else {
            cb(new CORSError(origin));
        }
    }

    private notFound(req: Request, res: Response, next: NextFunction) {
        next(new NotFoundError())
    }
}