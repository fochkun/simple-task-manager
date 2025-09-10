import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1757470277462 implements MigrationInterface {
    name = 'CreateTasksTable1757470277462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL, "title" character varying(255) NOT NULL, "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_task_id" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
