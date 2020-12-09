import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContextAnswer1606747883930 implements MigrationInterface {
    name = 'CreateContextAnswer1606747883930';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "context_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "type" text NOT NULL, "order" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "contextId" uuid, "userId" uuid, CONSTRAINT "PK_b5f8da9c7e395808a0e75e6890a" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(
            `ALTER TABLE "context_answer" ADD CONSTRAINT "FK_f2b67c01ef121c955bc63a2b181" FOREIGN KEY ("contextId") REFERENCES "context"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "context_answer" ADD CONSTRAINT "FK_d2e7549854172bbf217c8111c42" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "context_answer" DROP CONSTRAINT "FK_d2e7549854172bbf217c8111c42"`);
        await queryRunner.query(`ALTER TABLE "context_answer" DROP CONSTRAINT "FK_f2b67c01ef121c955bc63a2b181"`);
        await queryRunner.query(`DROP TABLE "context_answer"`);
    }
}
