import { MigrationInterface, QueryRunner } from 'typeorm';

export class addContextRelations1606256899009 implements MigrationInterface {
    name = 'addContextRelations1606256899009';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "context" ADD "areaId" uuid`);
        await queryRunner.query(
            `ALTER TABLE "context" ADD CONSTRAINT "FK_c7f4223f6345d135729096930bd" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "context" DROP CONSTRAINT "FK_c7f4223f6345d135729096930bd"`);
        await queryRunner.query(`ALTER TABLE "context" DROP COLUMN "areaId"`);
    }
}
