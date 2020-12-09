import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSession1606256899004 implements MigrationInterface {
    name = 'createSession1606256899004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "uniqueName" character varying NOT NULL, "isConnected" boolean NOT NULL DEFAULT false, "keepAlive" boolean NOT NULL DEFAULT false, "isDialogFlowActive" boolean NOT NULL DEFAULT false, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "session"`);
    }
}
