-- CreateEnum
CREATE TYPE "launch_status" AS ENUM ('create', 'in_process', 'finish', 'error');

-- CreateEnum
CREATE TYPE "method" AS ENUM ('GET', 'POST');

-- CreateEnum
CREATE TYPE "test_status" AS ENUM ('fail', 'pass');

-- CreateTable
CREATE TABLE "launch" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pipeline" INTEGER NOT NULL,
    "job" INTEGER NOT NULL,
    "src_branch" TEXT NOT NULL,
    "dst_branch" TEXT NOT NULL,
    "commit" TEXT NOT NULL,
    "fail_count" INTEGER,
    "pass_count" INTEGER,
    "duration" INTEGER,
    "tag" TEXT NOT NULL,
    "status" "launch_status" NOT NULL DEFAULT 'create',
    "service_name" TEXT NOT NULL,

    CONSTRAINT "launch_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "launch_error" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "launch_uuid" UUID NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "launch_error_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "request" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "method" "method" NOT NULL,
    "url" TEXT NOT NULL,
    "header" JSONB NOT NULL,
    "body" JSONB NOT NULL,

    CONSTRAINT "request_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "response" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "header" JSONB NOT NULL,
    "body" JSONB NOT NULL,

    CONSTRAINT "response_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "executions" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "launch_uuid" UUID NOT NULL,
    "request_uuid" UUID NOT NULL,
    "response_uuid" UUID NOT NULL,
    "fail_count" INTEGER,
    "pass_count" INTEGER,

    CONSTRAINT "executions_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "assertions" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "execution_uuid" UUID NOT NULL,
    "json_schema" UUID,
    "error_message" TEXT,
    "status" "test_status" NOT NULL,

    CONSTRAINT "assertions_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "json_schema" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "launch_uuid" UUID NOT NULL,
    "json_schema" JSONB NOT NULL,

    CONSTRAINT "json_schema_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "launch_pipeline_job_service_name_key" ON "launch"("pipeline", "job", "service_name");

-- CreateIndex
CREATE UNIQUE INDEX "launch_error_launch_uuid_key" ON "launch_error"("launch_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "executions_request_uuid_key" ON "executions"("request_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "executions_response_uuid_key" ON "executions"("response_uuid");

-- AddForeignKey
ALTER TABLE "launch_error" ADD CONSTRAINT "launch_error_launch_uuid_fkey" FOREIGN KEY ("launch_uuid") REFERENCES "launch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "executions" ADD CONSTRAINT "executions_launch_uuid_fkey" FOREIGN KEY ("launch_uuid") REFERENCES "launch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "executions" ADD CONSTRAINT "executions_request_uuid_fkey" FOREIGN KEY ("request_uuid") REFERENCES "request"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "executions" ADD CONSTRAINT "executions_response_uuid_fkey" FOREIGN KEY ("response_uuid") REFERENCES "response"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assertions" ADD CONSTRAINT "assertions_execution_uuid_fkey" FOREIGN KEY ("execution_uuid") REFERENCES "executions"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assertions" ADD CONSTRAINT "assertions_json_schema_fkey" FOREIGN KEY ("json_schema") REFERENCES "json_schema"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "json_schema" ADD CONSTRAINT "json_schema_launch_uuid_fkey" FOREIGN KEY ("launch_uuid") REFERENCES "launch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
