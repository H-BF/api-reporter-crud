-- AlterTable
ALTER TABLE "assertions" ADD COLUMN     "json_schema" UUID;

-- CreateTable
CREATE TABLE "json_schema" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "launch_uuid" UUID NOT NULL,
    "json_schema" JSONB NOT NULL,

    CONSTRAINT "json_schema_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "assertions" ADD CONSTRAINT "assertions_json_schema_fkey" FOREIGN KEY ("json_schema") REFERENCES "json_schema"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "json_schema" ADD CONSTRAINT "json_schema_launch_uuid_fkey" FOREIGN KEY ("launch_uuid") REFERENCES "launch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
